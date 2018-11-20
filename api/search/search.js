const express = require('express')
var htmlparser = require("htmlparser2");
const querystring = require('querystring');
var https = require("https");

const app = express()

/**
 * Função responsavel por encontar um {sid} válido e os {cookies} necessários para iniciar uma busca no site
 * 
 * @param {object} data - Recebe os valores presentes em req.body
 * 
 * @returns {object} = { success: true, data: {object} }
 * @returns {object} = { success: false, data: {object} }
 * @returns {object} = { success: false, error: {string} }
 */
async function post(data, callback) {
	try {
		/** 
		 * Verificação dos parametros com envio obrigatório
		 * @param {string} checkin
		 * @param {string} checkout
		 */
		if(!data.hasOwnProperty('checkin')) throw new Error("Sem permissão para realizar este comando.")
		if(!data.hasOwnProperty('checkout')) throw new Error("Sem permissão para realizar este comando.")

		/** @var request_data_byChain - Dados necessarios para realizar buscas por hoteis com quartos disponiveis */
		var request_data_byChain = {
			ucUrl: 				'SearchResultsByChain',
			hotel: 				data.hotel || '',
			hotelname: 			data.hotelname || '',
			CheckIn: 			data.checkin.replace(/[^a-zA-Z0-9]/g,''),
			CheckOut: 			data.checkout.replace(/[^a-zA-Z0-9]/g,''),
			Code:				data.code || '',
			group_code: 		data.group_code || '',
			loyality_card:		data.loyality_card || '',
			NRooms:				data.nrooms || 1,
			ad:					data.ad || 2,
			ch:					data.ch || 0,
			ag:					data.ag || '-',
			sid: 				data.sid,
			rnd:				data.rnd || '1542435931910'			
		}

		/** @var request_data_byRoom - Dados necessarios para realizar buscas com quartos disponiveis em hoteis */
		var request_data_byRoom = {
			ucUrl: 				'SearchResultsByRoom',
			diff:				false,
			CheckIn: 			data.checkin.replace(/[^a-zA-Z0-9]/g,''),
			CheckOut: 			data.checkout.replace(/[^a-zA-Z0-9]/g,''),
			Code:				data.code || '',
			group_code: 		data.group_code || '',
			loyality_card:		data.loyality_card || '',
			NRooms:				data.nrooms || 1,
			ad:					data.ad || 1,
			ch:					data.ch || 0,
			ag:					data.ag || '-',
			q:					data.q || '5462', // Hotel Fazenda Suíça(5461)  Hotel Village(5462) 
			sid: 				data.sid,
			rnd:				data.rnd || '1542435931910'			
		}

		var cookie = '';
		switch(data.ucUrl){
			
			case 'SearchResultsByRoom':
			/** 
			 * Caso o @var data.ucUrl seja de valor 'SearchResultsByRoom' é realizado uma busca por um @var sid e @var cookie validos, necessarios
			 * para realizar buscas pela API, apos aguardar o retorno destes dados é realizado uma busca utilizando os parametros definidos em 
			 * @var request_data_byRoom, o resultado é processado e os quartos encontrados são retornados em @var data.
			 * 
			 * obs: Os dados encontrados em @function get_validSid são necessarios, mas apos encontrados, tem validade de 24h. O armazenamento destes
			 * dados pode reduzir bastante o tempo de processamento, em testes realizados encontrei uma diferença de mais de 2000ms,
			 * 4800ms pra requisiçoes sem enviar um @var sid e 2200ms enviando um @var sid valído 
			 */
			await get_validSid(data.ucUrl).then(d =>{
				request_data_byRoom.sid = d.sid
				cookie = d.cookie[0].substr(0, d.cookie[0].indexOf(';'))+'; '+d.cookie[1].substr(0,  d.cookie[1].indexOf(';'))+'; '
				console.log(cookie)
			},err =>{
				throw new Error("Não foi possivel encontrar um SID valido.")	
			});
			/** @function SearchResultsByRoom - Responsavel por encontrar quartos disponiveis com base dos dados enviados em @var request_data_byRoom  */
			SearchResultsByRoom(request_data_byRoom,cookie).then(response =>{
				return callback(null, { success : true, data : response });
			}, err =>{
				return callback(null, { success : false, data : response });
			});
			break;

			default:
			/** 
			 * Caso o @var data.ucUrl seja de valor 'SearchResultsByChain' é realizado uma busca por um @var sid e @var cookie validos, necessarios
			 * para realizar buscas pela API, apos aguardar o retorno destes dados é realizado uma busca utilizando os parametros definidos em 
			 * @var request_data_byRoom, o resultado é processado e os quartos encontrados são retornados em @var data.
			 * 
			 * obs: Os dados encontrados em @function get_validSid são necessarios, mas apos encontrados, tem validade de 24h. O armazenamento destes
			 * dados pode reduzir bastante o tempo de processamento, em testes realizados encontrei uma diferença de mais de 2000ms,
			 * 4800ms pra requisiçoes sem enviar um @var sid e 2200ms enviando um @var sid valído 
			 */
			await get_validSid(data.ucUrl).then(d =>{
				console.log(d)
				request_data_byChain.sid = d.sid
				cookie = d.cookie[0].substr(0, d.cookie[0].indexOf(';'))+'; '+d.cookie[1].substr(0,  d.cookie[1].indexOf(';'))+';'
				console.log(cookie)
			},err =>{
				throw new Error("Não foi possivel encontrar um SID valido.")	
			});
			/** @function SearchResultsByChain - Responsavel por encontrar hoteis com quartos disponiveis com base dos dados enviados em @var request_data_byChain  */
			SearchResultsByChain(request_data_byChain,cookie).then(response =>{
				return callback(null, { success : true, data : response });
			}, err =>{
				return callback(null, { success : false, data : response });
			});
			break;
		}
	} catch (e) {
		/** 
		 * Caso for encontrado algum erro enquanto a API realizar o processamento dos dados, sua descrição e retornada
		 * obs: não indicado em ambiente de Produção
		 */
		return callback(null, { success: false, error: e.message });
	}
}

/**
 * Função responsavel por encontar um {sid} válido e os {cookies} necessários para iniciar uma busca no site
 * 
 * @param {string} type - Tipo de busca que a API pretente realizar
 * 
 * @returns {object} = { success: true, sid: {string}, cookie: {string} }
 * @returns {object} = { success: false, error: {string} }
 */
async function get_validSid ( type='SearchResultsByChain'){
	type = 'SearchResultsByRoom'
	return new Promise((resolve,reject) => {

		/** @var url {string} - Endereço na Web onde poderão ser encontrados os dados necessários, seu valor depende do @param type */
		var url = 'https://myreservations.omnibees.com/chain.aspx?c=2983&lang=pt-BR&version=MyReservation'
		if(type == 'SearchResultsByRoom') url = 'https://myreservations.omnibees.com/default.aspx?q=5462'

		switch(type){
			case 'SearchResultsByChain':
			/** 
			 * Caso o @param type seja de valor 'SearchResultsByChain' é realizado uma requisição HTTPS GET para a @var url definida, apos
			 * realizada a requisição, o conteudo da pagina é processado com o intuito de encontrar um elemento HTML de id='bookingEngineForm',
			 * este elemento é responsavel por armazenar o @var sid, obrigatório para realizar buscas pela API, apos encontrado, retornamos
			 * seu valor junto ao @var cookie, que recebe o headers['set-cookie'] da requisição, tambem obrigatorio para realizar buscas pela API 
			 */
			var request = https.request(url, function(result) {
				console.log(result.headers["set-cookie"])
				/** @var body {string} - Variavel responsavel por receber todo o conteudo da requisição GET */
				var body = '';		
				result.on("data", function(chunk) { body += chunk; });
				result.on("end", function(chunk) {
					var start_parcer = new htmlparser.Parser({
						onopentag: function(name, attribs){ // Verificação de cada tag presente no HTML da página
							if(attribs.id == "bookingEngineForm"){							
								const q = querystring.parse(attribs.action.substring(attribs.action.lastIndexOf('?')+1))
								console.log(q)
								if(q['amp;sid'])resolve({ success: true, sid: q['amp;sid'],cookie: result.headers["set-cookie"]});
							}
						}
					})
					start_parcer.write(body);
					start_parcer.end();
					/** Caso apos o processamento da pagina não for encontrado um @var sid válido, é retornado uma mensagem de erro */
					reject({ success: false, error: "Não foi possivel encontrar os dados para realizar a busca" })
				});
			}).on('error', function(e) {
				/** Caso não seja possivel realizar o processamento da página, é retornado uma mensagem com o erro encontrado */
				return reject({ success: false, error: e.message });
			});
			request.end();
			break;

			case 'SearchResultsByRoom':
			/** 
			 * Caso o @param type seja de valor 'SearchResultsByRoom' é realizado uma requisição HTTPS GET para a @var url definida, apos
			 * realizada a requisição, o conteudo da pagina é processado com o intuito de encontrar um elemento HTML de id='hfSID',
			 * este elemento é responsavel por armazenar o @var sid, obrigatório para realizar buscas pela API, apos encontrado, retornamos
			 * seu valor junto ao @var cookie, que recebe o headers['set-cookie'] da requisição, tambem obrigatorio para realizar buscas pela API 
			 */
			var request = https.request(url, function(result) {
				/** @var body {string} - Variavel responsavel por receber todo o conteudo da requisição GET */
				var body = '';
				result.on("data", function(chunk) { body += chunk; });
				result.on("end", function(chunk) {
					var start_parcer = new htmlparser.Parser({ // Verificação de cada tag presente no HTML da página
						onopentag: function(name, attribs){
							if(attribs.id == "hfSID"){				
								if(attribs.value)resolve({ success: true, sid: attribs.value,cookie: result.headers["set-cookie"] });
							}
						}
					})
					start_parcer.write(body);
					start_parcer.end();
					/** Caso apos o processamento da pagina não for encontrado um @var sid válido, é retornado uma mensagem de erro */
					reject({ success: false, error: "Não foi possivel encontrar os dados para realizar a busca" })
				});
			}).on('error', function(e) {
				/** Caso não seja possivel realizar o processamento da página, é retornado uma mensagem com o erro encontrado */
				return reject({ success: false, error: e.message });
			});
			request.end();
			break;

			default :
			/** Caso o @type for inválido, é retornado uma mensagem de erro  */
			reject({ success: false, error: "Não foi possivel encontrar os dados para realizar a busca" });
			break;
		}		
	});
}

/**
 * Função responsavel buscar quartos disponives com base nos parametros enviados
 * 
 * @param {request_data} request_data - @var request_data_byRoom
 * 
 * @returns {object} = { success: true, rooms: {array} }
 * @returns {object} = { success: false, error: {string} }
 */

async function SearchResultsByRoom(request_data,cookie){
	return new Promise( (resolve,reject) => {

		// dados para requisição de quartos disponiveis
		const request_options = {
			host: 'myreservations.omnibees.com',
			path: '/Handlers/ajaxLoader.ashx?'+querystring.stringify(request_data),
			method: 'GET',
			protocol:'https:',
			headers: {
				authority: 'myreservations.omnibees.com',
				cookie: cookie+' '+request_data.sid+'_window='+request_data.sid+'; '+request_data.sid+'_LoginIncentive=closed; _fbp=fb.1.1542611394946.562690271; linkedin_oauth_77jw25kgtwgngu=null; linkedin_oauth_77jw25kgtwgngu_crc=null; _ga=GA1.2.1698768929.1542298507; _gid=GA1.2.259785023.1542572302; G_ENABLED_IDPS=google; '+request_data.sid+'_LoyaltyRegister=closed' 
			},
		}

		var request = https.request(request_options, function(result){
			var body = "";
			result.on("data", function(chunk) { body += chunk; });
			result.on("end", function(chunk) {
				var rooms = []
				var room = {
					title: null,
					title_full: null,
					status: null,
					url: null, 
					geolocation_url: null,
					description: null,
					short_description: null,
					price: null,
					thumbnail: null,
					amenities: null,
					gallery: null
				}
				// função responsavel por processar o HTML recebido e retornar um json com os dados importantes
				var parser = new htmlparser.Parser(new htmlparser.DomHandler(function (error, dom) {
					dom.forEach(element => {
						if(element.name !== 'div') return;
						if(element.attribs['id']=='packageSearchParameters'){
							// packageSearchParameters = id
						}						
						if(element.attribs['class']=='wrapRoomsResults'){
							// wrapRoomsResults = class
							element.children.forEach(element => {
								if(element.name !== 'div') return;
								if(element.attribs['id']=='rooms_results'){
									// rooms_results
									element.children.forEach(element => {
										if(element.name !== 'div') return;
										if(element.attribs['class']=='wrap'){
											// wrap
											element.children.forEach(element => {
												if(element.name !== 'div') return;
												if(element.attribs['id']=='results'){
													// result
													element.children.forEach(element => {
														if(element.name !== 'div') return;
														if(element.attribs['class']=='entries'){
															// entries
															element.children.forEach(element => {
																if(element.name !== 'div') return;
																if(element.attribs['class']=='entry'){
																	//entry
																	element.children.forEach(element => {
																		if(element.name !== 'div') return;
																		if(element.attribs['class']=='content'){
																			//entry
																			element.children.forEach(element => {
																				if(element.name !== 'table') return;
																				if(element.attribs['class']=='maintable'){
																					//maintable																					
																					element.children.forEach(element => {
																						if(element.name !== 'tr') return;
																						if(element.attribs['class'].indexOf('roomName')!= -1){
																							// roomName
																							room = { }
																							element.children.forEach(element =>{																								
																								if(element.name !== 'td') return;
																								if(element.attribs['class'] == 'colExcerpt'){
																									// colExcerpt
																									element.children.forEach(element =>{
																										if(element.name !== 'div') return;
																										if(element.attribs['class'] == 'roomExcerpt'){
																											// colExcerpt
																											element.children.forEach(element =>{
																												if(element.name !== 'div') return;
																												if(element.attribs['class'].indexOf('thumb')!= -1){
																													// trumb
																													element.children.forEach(element =>{
																														if(element.name !== 'div') return;
																														if(element.attribs['class'] == 'roomSlider'){
																															// roomSlider
																															room.gallery = []
																															element.children.forEach(element =>{
																																if(element.name !== 'div') return;
																																if(element.attribs['class'].indexOf('slide')!= -1){
																																	// slide
																																	element.children.forEach(element =>{
																																		if(element.name !== 'a') return;
																																		if(element.attribs['class'] == 'fancybox-thumbs'){
																																			// slide
																																			room.gallery.push({
																																				src 	: element.attribs['href'] || null,
																																				alt 	: element.attribs['name'] || null
																																			})
																																		}
																																	})
																																}
																															})
																														}
																													})
																												}
																												if(element.attribs['class'] == 'excerpt'){
																													element.children.forEach(element =>{
																														if(element.name == 'h5'){
																															element.children.forEach(element =>{
																																if(element.name == 'a'){
																																	room.url = element.attribs['href']
																																	element.children.forEach(element =>{
																																		if(element.type !== 'text') return;
																																		room.title = element.data
																																	})
																																}
																															})
																														}
																														if(element.name == 'p'){
																															element.children.forEach(element =>{
																																if(element.name == 'a'){
																																	room.url = element.attribs['href']
																																	element.children.forEach(element =>{
																																		if(element.type !== 'text') return;
																																		room.short_description = element.data
																																	})
																																}
																															})
																														}
																													})
																												}																												
																											})																										
																										}
																									})
																								}
																							})
																							var room_options = []
																							element.parent.children.forEach(element =>{
																								if(element.name != 'tr')return;																								
																								if(element.attribs['class'].indexOf('item jsRoom_'+rooms.length) !== -1){
																									
																									// jsRoom
																									var room_option = { }																									
																									element.children.forEach(element =>{
																										if(element.name != 'td')return;
																										if(element.attribs['class'] == 'col_2 rates_col2'){
																											element.children.forEach(element =>{
																												if(element.name !== 'div') return;																										
																												if(element.attribs['class'] == 'wrapRateInfo'){
																													if(!element.children) return;
																													element.children.forEach(element =>{
																														if(!element.children) return;
																														element.children.forEach(element =>{
																															if(!element.children) return;
																															element.children.forEach(element =>{
																																if(!element.children) return;
																																element.children.forEach(element =>{
																																	if(!element.children) return;
																																	element.children.forEach(element =>{
																																		if(element.name !== 'div')return;
																																		if(!element.children) return;
																																		element.children.forEach(element =>{
																																			if(!element.attribs) return;
																																			if(element.attribs['class'] == 'rateName'){
																																				element.children.forEach(element =>{
																																					if(element.name == 'a'){
																																						element.children.forEach( element =>{
																																							if(element.type == 'text')room_option.rateName = element.data
																																						})
																																					}																																					
																																				})
																																			}
																																			if(element.name == 'span' && element.attribs['class'].indexOf('extras ') !== -1){
																																				var extras = []
																																				element.children.forEach(element =>{
																																					
																																					if(element.name == 'a'){
																																						element.children.forEach( element =>{
																																							if(element.type == 'text')extras.push(element.data.trim())
																																						})
																																					}																																					
																																				})
																																				room_option.extras = extras
																																			}

																																		})
																																	})																																	
																																})
																															})
																														})
																													})

																												}
																											})
																											
																											
																										}
																										if(element.attribs['class'] == 'col_3 rates_col3'){																											
																											element.children.forEach(element =>{
																												if(element.name != 'table')return;
																												if(element.attribs['class'] == 'ratePriceTable'){
																													if(!element.children) return;
																													element.children.forEach(element =>{
																														if(!element.children) return;
																														element.children.forEach(element =>{
																															if(!element.children) return;
																															element.children.forEach(element =>{
																																if(element.name == 'a'){
																																	element.children.forEach( element =>{
																																		if(element.type == 'text')room_option.text = element.data
																																	})
																																} else if(element.name == 'input'){
																																	room_option.value = element.attribs.value
																																	room_options.push(room_option)
																																}
																																
																															})
																														})
																													})

																												}
																											})
																										}
																																																	
																									})
																									//room_options.push(room_option)																																																																											
																								}
																							})
																							room.price_options = room_options
																							rooms.push(room)
																						}
																					})
																				}
																			})
																		}
																	})
																}
															})
														}
													})
												}
											})

										}
									})
								}
							})
						}
					}); 
				}));
				parser.write(body);
				parser.end();
				resolve({ success: true, rooms: rooms });
			});
		}).on('error', function(e) {
			reject(null, { success: false, error: e.message });
		});
		request.end();
	})
}

/**
 * Função responsavel buscar hoteis com quartos disponives com base nos parametros enviados
 * 
 * @param {request_data} request_data - @var request_data_byChain
 * 
 * @returns {object} = { success: true, entries: {array} }
 * @returns {object} = { success: false, error: {string} }
 */
async function SearchResultsByChain(request_data,cookie){
	return new Promise( (resolve,reject) => {
		// dados para requisição de hoteis com quartos disponiveis
		const request_options = {
			host: 'myreservations.omnibees.com',
			path: '/Handlers/ajaxLoader.ashx?'+querystring.stringify(request_data),
			method: 'GET',
			protocol:'https:',
			headers: {
				authority: 'myreservations.omnibees.com',
				cookie: cookie 
			},
		}
		console.log(request_options)
		
		var request = https.request(request_options, function(result) {
			var body = "";
			result.on("data", function(chunk) { body += chunk; });
			result.on("end", function(chunk) {
				var entries = []
				
				// função responsavel por processar o HTML recebido e retornar um json com os dados importantes
				var parser = new htmlparser.Parser(new htmlparser.DomHandler(function (error, dom) {
					dom.forEach(element => {
						if(element.name !== 'div') return;
						if(element.attribs['id']=='search_results'){
							element.children.forEach(element =>{
								if(!element.attribs) return;
								if(element.attribs['class'] !=='entries') return;
								element.children.forEach(element =>{
									if(!element.attribs) return;
									if(element.attribs['class'].indexOf('entry') == -1)return;
									var entry = {
										title: null,
										title_full: null,
										status: null,
										url: null, 
										geolocation_url: null,
										description: null,
										short_description: null,
										price: null,
										thumbnail: null,
										amenities: null,
										gallery: null
									}
									entry.status = element.attribs['class'].replace('entry ','')

									element.children.forEach(element =>{
										if(!element.attribs) return;
										if(element.attribs['class'] == 'thumb'){
											element.children.forEach(element => {
												if(!element.attribs) return;
												if(element.attribs['class'] == 'image'){
													element.children.forEach(element => {
														if(element.name == 'a'){
															entry.thumbnail = {
																src 	: element.attribs['href'] || null,
																title 	: element.attribs['data-fancybox-group'] || null,
																alt		: element.attribs['name'] || null
															}
														}
													})
												}
											})
										} else if( element.attribs['class'] == 'description'){
											element.children.forEach(element => {
												if(!element.attribs) return;
												if(element.attribs['class'] == 'clear') return;
												if(element.attribs['class'] == 'tabs_content'){
													element.children.forEach(element => {
														if(!element.attribs) return;
														switch(element.attribs['class']){
															case 'tab_1 pane':
															entry.description = []
															element.children.forEach(element =>{
																if(element.name !== 'p') return;
																element.children.forEach( (element, key) =>{
																	if(key == 0) entry.title = element.data
																	else if(element.type=='text'){
																		entry.description.push(element.data)																		
																	}
																})
															})
															break;
															case 'tab_2 pane':
															entry.amenities = []
															element.children.forEach(element =>{
																if(!element.attribs) return;																
																if(element.attribs['class'] == 'amenities') {
																	var amenity = { title:'', list:[] }
																	element.children.forEach( element =>{
																		if(element.name == 'h6')
																		element.children.forEach( element =>{
																			if(element.type == 'text')amenity.title = element.data
																		})
																		else if(element.name == 'ul'){
																			element.children.forEach( element =>{
																				if(element.name == 'li'){
																					element.children.forEach( element =>{
																						if(element.type == 'text')amenity.list.push(element.data.replace('- ',''))
																					})
																				}																				
																			})
																		}
																	})
																	entry.amenities.push(amenity)
																}
															})
															break;
															case 'tab_3 pane':
															entry.gallery = { big_preview : {} , small_preview : [] }
															element.children.forEach(element =>{
																if(element.name == 'ul'){
																	element.children.forEach(element =>{
																		if(!element.attribs) return;																
																		if(element.attribs['class'] == 'gallery') {
																			element.children.forEach(element =>{
																				if(!element.attribs) return;																
																				if(element.attribs['class'] == 'big_preview') {
																					element.children.forEach(element =>{
																						if(element.name == 'li'){
																							element.children.forEach( element =>{
																								if(element.name == 'a'){
																									element.children.forEach( element =>{
																										if(!element.attribs) return;																
																										if(element.name == ['img'] ) {																											
																											entry.gallery.big_preview = {
																												src 	: element.attribs['src'] || null,
																												alt 	: element.attribs['alt'] || null,
																												title 	: element.attribs['title'] || null
																											}
																										}																										
																									})
																								}
																							})
																						}
																						
																					})
																				} else if(element.attribs['class'] == 'small_preview') {
																					element.children.forEach(element =>{
																						if(element.name == 'li'){
																							element.children.forEach( element =>{
																								if(!element.attribs) return;																
																								if(element.name == 'img') {																									
																									entry.gallery.small_preview.push({
																										src 	: element.attribs['src'] || null,
																										width 	: element.attribs['width'] || null,
																										rel 	: element.attribs['rel'] || null
																									})
																								}
																							})
																						}
																						
																					})
																				}
																			})
																		}
																	})
																}
															})
															break;
															case 'tab_4 pane':
															element.children.forEach(element =>{
																if(!element.attribs) return;																
																if(element.attribs['class'] == 'wrap_embedmap') {
																	element.children.forEach(element =>{
																		if(!element.attribs) return;
																		if(element.name == 'iframe'){
																			entry.geolocation_url = element.attribs['src']
																		}																
																	})
																}
															})
															break;
														}
													})
												}else{
													if(!element.children)return;
													element.children.forEach(element =>{
														if(!element.children)return;
														element.children.forEach(element =>{
															if(!element.attribs)return;
															if(element.attribs['class'] == 'price'){
																entry.price = { value: null, status: 0 , link : null}
																element.children.forEach(element =>{
																	if(!element.children)return;
																	element.children.forEach(element =>{
																		if(!element.attribs)return;
																		if(element.attribs['class']){
																			if(element.attribs['class'] == 'notAvailableChainPrice'){
																				entry.price.status = 0
																			}else if(element.attribs['class'].indexOf('chainPriceHotelResult')!= -1){
																				entry.price.status = 1
																				element.children.forEach(element =>{
																					if(element.name == 'h5'){
																						element.children.forEach( element =>{
																							if(element.type == 'text')entry.price.value = element.data
																						})
																					}
																				})
																			}
																		}
																		if(element.name == 'a'){
																			entry.price.link = element.attribs['href'] || null
																		}
																	})
																})
															}else{
																if(!element.children)return;
																element.children.forEach(element =>{
																	if(element.name == 'h5'){
																		element.children.forEach(element =>{
																			if(!element.attribs)return;
																			if(!element.attribs['class'])return;
																			if(element.attribs['class'].indexOf('stars_')!== -1){
																				entry.url = element.attribs['href']
																				entry.title_full = element.attribs['title']
																			}
																		})
																		element.next.next.children.forEach( element =>{
																			if(element.type == 'text')entry.short_description = element.data
																		})
																	}
																})
															}												
														})
													})
												}

											})

										}
									})
									entries.push(entry)
								})
							})
						}						
					}); 
				}));
				parser.write(body);
				parser.end();
				resolve({ success: true, entries: entries });
			});
		}).on('error', function(e) {
			reject(null, { success: false, error: e.message });
		});
		request.end();
	})
}

module.exports = {
    post
}