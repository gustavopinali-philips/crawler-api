# Crawler API

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Crawler API é um robo responsavel por realizar buscas por hoteis e quartos disponiveis no site http://lecanton.com.br para um período específico .

### Instalação

Crawler API requires [Node.js](https://nodejs.org/) v8.1.3+ to run.
Instale as dependências e inicie o servidor.

```sh
$ cd crawler-api
$ npm install
$ node server.js
```
### Funcionalidades!

  - Buscar por hoteis disponiveis 
  - Buscar por quartos disponiveis


Como realizar uma busca por hoteis disponiveis :
```
POST : /buscar
body{
    checkin:    20/01/2019
    checkout:   27/01/2019
    ucUrl:      SearchResultsByChain
    hotel:      (ID do Hotel)
    hotelname:  (Nome do Hotel)
    nrooms:     (quantidade de quartos)
    ad:         (quantidade de adultos)
    ch:         (quantidade de crianças)
}
```
* os campos checkin e checkout são obrigatórios

Exemplo de resposta para uma busca por hoteis disponiveis :
```json
{
    "success": true,
    "data": {
        "entries": [
            {
                "title": "Hotel Fazenda Suíça",
                "title_full": "Hotel Fazenda Suíça Le Canton ",
                "status": "available",
                "url": "/default.aspx?q=5461&lang=pt-BR&sid=6718bb72-fb48-4d29-87cb-2b0e91623251#/diff=&CheckIn=20012019&CheckOut=27012019&NRooms=1&ad=2&ch=0&ag=-&Code=&group_code=&loyality_card=",
                "geolocation_url": "/util/geoLocation.aspx?lat=-22.3853285&amp;lng=-42.8561643&language=pt-BR",
                "description": [
                    "Reproduzindo a arquitetura dos campos suíços, o segundo hotel do complexo Le Canton oferece 34 apartamentos nas categorias Luxo e Master, restaurante, piscina climatizada, academia de ginástica, saunas seca e a vapor, bar com música ao vivo, queijaria e uma fazenda com criações de diversos animais.",
                    "Além disso, os hóspedes podem usufruir de todas as atividades do Complexo Esportivo Le Canton, com diversas opções de lazer e aventura. Há serviço de transporte gratuito, de meia em meia hora, com destino às áreas esportivas, de entretenimento, bem como ao hotel Village Le Canton.",
                    "Existem atividades/atrações que são cobradas à parte e possuem horários de funcionamento variados. As diárias do Hotel Fazenda Suíça incluem café da manhã, almoço e jantar no restaurante Gasthaus Kulm (bebidas cobradas à parte). Consulte a central de reservas.",
                    "Somos um complexo hoteleiro, tendo o Hotel Village Le Canton e o Hotel Fazenda Suíça, no entanto, os hóspedes somente poderão acessar a piscina e consumir as refeições, que são inclusas da pensão completa, exclusivamente no hotel de origem da reserva.",
                    "ATENÇÃO! Nos períodos de 01/11/2018 a 05/11/2018, o Hotel Village Le Canton estará fechado exclusivamente para um grupo. Nestas datas, a Fazenda Suíça Le Canton estará aberta, no entanto, por ser um grupo privado, os hóspedes que estiverem na Fazenda Suíça Le Canton, nestes dias, não poderão acessar nenhuma área social do Hotel Village Le Canton. Para maiores dúvidas e/ou informações, por favor, entrar em contato com nossa Central de Reservas."
                ],
                "short_description": "Hotel Fazenda SuíçaReproduzindo a arquitetura dos campos suíços, o segundo hotel do complexo Le Canton oferece 34 apartamentos nas categorias ...",
                "price": {
                    "value": "R$ 1.146,79",
                    "status": 1,
                    "link": "/default.aspx?q=5461&lang=pt-BR&sid=6718bb72-fb48-4d29-87cb-2b0e91623251#/diff=&CheckIn=20012019&CheckOut=27012019&NRooms=1&ad=2&ch=0&ag=-&Code=&group_code=&loyality_card="
                },
                "thumbnail": {
                    "src": "/Handlers/ImageLoader.ashx?imageID=149597.jpg",
                    "title": "Hotel Fazenda Suíça Le Canton ",
                    "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=149597"
                },
                "amenities": [
                    {
                        "title": "Serviços Gerais",
                        "list": [
                            "Berço disponivel a pedido",
                            "Aceita os principais cartões de crédito",
                            "Serviço de limpeza diário",
                            "Recepção 24 horas",
                            "Free Wifi"
                        ]
                    },
                    {
                        "title": "Restaurantes e Bares",
                        "list": [
                            "Bar",
                            "Restaurante Buffet"
                        ]
                    },
                    {
                        "title": "Bem-estar e Lazer",
                        "list": [
                            "Piscina",
                            "Espaço Kids",
                            "Sauna"
                        ]
                    },
                    {
                        "title": "Eventos & Conferências",
                        "list": [
                            "Serviço de Casamentos",
                            "Sala de Reuniões"
                        ]
                    }
                ],
                "gallery": {
                    "big_preview": {
                        "src": "/Handlers/ImageLoader.ashx?imageID=149597&sz=400x266",
                        "alt": "Title",
                        "title": "Title"
                    },
                    "small_preview": [
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149597&sz=400x266",
                            "width": "90",
                            "rel": "0"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149598&sz=400x266",
                            "width": "90",
                            "rel": "1"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149599&sz=400x266",
                            "width": "90",
                            "rel": "2"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149600&sz=400x266",
                            "width": "90",
                            "rel": "3"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149601&sz=400x266",
                            "width": "90",
                            "rel": "4"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149602&sz=400x266",
                            "width": "90",
                            "rel": "5"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149603&sz=400x266",
                            "width": "90",
                            "rel": "6"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149604&sz=400x266",
                            "width": "90",
                            "rel": "7"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149605&sz=400x266",
                            "width": "90",
                            "rel": "8"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149608&sz=400x266",
                            "width": "90",
                            "rel": "9"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149612&sz=400x266",
                            "width": "90",
                            "rel": "10"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149613&sz=400x266",
                            "width": "90",
                            "rel": "11"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=149614&sz=400x266",
                            "width": "90",
                            "rel": "12"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=189898&sz=400x266",
                            "width": "90",
                            "rel": "13"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=189901&sz=400x266",
                            "width": "90",
                            "rel": "14"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=189902&sz=400x266",
                            "width": "90",
                            "rel": "15"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=189903&sz=400x266",
                            "width": "90",
                            "rel": "16"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=189904&sz=400x266",
                            "width": "90",
                            "rel": "17"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=189906&sz=400x266",
                            "width": "90",
                            "rel": "18"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=189911&sz=400x266",
                            "width": "90",
                            "rel": "19"
                        }
                    ]
                }
            },
            {
                "title": "Hotel Village",
                "title_full": "Hotel Village Le Canton",
                "status": "available",
                "url": "/default.aspx?q=5462&lang=pt-BR&sid=6718bb72-fb48-4d29-87cb-2b0e91623251#/diff=&CheckIn=20012019&CheckOut=27012019&NRooms=1&ad=2&ch=0&ag=-&Code=&group_code=&loyality_card=",
                "geolocation_url": "/util/geoLocation.aspx?lat=-22.3853285&amp;lng=-42.8561643&language=pt-BR",
                "description": [
                    "Aconchegantes e requintados, nossos 153 apartamentos oferecem todas as comodidades para proporcionar a você uma estadia agradável. As acomodações dispõem de serviço de quarto, ar climatizado (quente ou frio) e TV à cabo. Possui 3 piscinas climatizadas, mais de 20 opções de lazer e recreadores que garantem a diversão da garotada o dia todo. O hotel ainda oferece opcionais, como um spa completo para você relaxar, com salas de tratamento, sauna, fitness center e uma piscina aquecida coberta (não incluso na diária).",
                    "Todas as nossas diárias incluem café da manhã, almoço e jantar no restaurante Lugano (bebidas são cobradas à parte). Existem atividades/atrações que são cobradas à parte e possuem horários de funcionamento variados. Consulte a central de reservas.",
                    "Somos um complexo hoteleiro, tendo o Hotel Village Le Canton e o Hotel Fazenda Suíça, no entanto, os hóspedes somente poderão acessar a piscina e consumir as refeições, que são inclusas da pensão completa, exclusivamente no hotel de origem da reserva.",
                    "***Nos períodos de 01/11 a 07/11 e 03/12 a 07/12, o Hotel Village Le Canton estará fechado exclusivamente para um grupo. Nestas datas, a Fazenda Suíça Le Canton estará aberta, no entanto, por ser um grupo privado, os hóspedes que estiverem na Fazenda Suí\ufffd\ufffda Le Canton, nestes dias, não poderão acessar nenhuma área social do Hotel Village Le Canton. Para maiores dúvidas e/ou informações, por favor, entrar em contato com nossa Central de Reservas.***"
                ],
                "short_description": "Hotel VillageAconchegantes e requintados, nossos 153 apartamentos oferecem todas as comodidades para proporcionar a você uma estadia agradável. ...",
                "price": {
                    "value": "R$ 1.201,43",
                    "status": 1,
                    "link": "/default.aspx?q=5462&lang=pt-BR&sid=6718bb72-fb48-4d29-87cb-2b0e91623251#/diff=&CheckIn=20012019&CheckOut=27012019&NRooms=1&ad=2&ch=0&ag=-&Code=&group_code=&loyality_card="
                },
                "thumbnail": {
                    "src": "/Handlers/ImageLoader.ashx?imageID=152248.jpg",
                    "title": "Hotel Village Le Canton",
                    "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=152248"
                },
                "amenities": [
                    {
                        "title": "Serviços Gerais",
                        "list": [
                            "Berço disponivel a pedido",
                            "Aceita os principais cartões de crédito",
                            "Serviço de limpeza diário",
                            "Sala de tv",
                            "Sala de Jogos",
                            "Recepção 24 horas",
                            "Lojas/Shopping",
                            "Free Wifi"
                        ]
                    },
                    {
                        "title": "Restaurantes e Bares",
                        "list": [
                            "Bar",
                            "Bar de Piscina",
                            "Restaurante Buffet"
                        ]
                    },
                    {
                        "title": "Bem-estar e Lazer",
                        "list": [
                            "SPA",
                            "Serviço de Massagens",
                            "Piscina",
                            "Espaço Kids",
                            "Mesa de Bilhar",
                            "Parquinho",
                            "Academia de ginástica gratuita"
                        ]
                    },
                    {
                        "title": "Eventos & Conferências",
                        "list": [
                            "Salas de Reuniões",
                            "Sala de Reuniões"
                        ]
                    }
                ],
                "gallery": {
                    "big_preview": {
                        "src": "/Handlers/ImageLoader.ashx?imageID=152248&sz=400x266",
                        "alt": "Title",
                        "title": "Title"
                    },
                    "small_preview": [
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=152248&sz=400x266",
                            "width": "90",
                            "rel": "0"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=152251&sz=400x266",
                            "width": "90",
                            "rel": "1"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=152252&sz=400x266",
                            "width": "90",
                            "rel": "2"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=152253&sz=400x266",
                            "width": "90",
                            "rel": "3"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=152254&sz=400x266",
                            "width": "90",
                            "rel": "4"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=152586&sz=400x266",
                            "width": "90",
                            "rel": "5"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=152589&sz=400x266",
                            "width": "90",
                            "rel": "6"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=152590&sz=400x266",
                            "width": "90",
                            "rel": "7"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=152591&sz=400x266",
                            "width": "90",
                            "rel": "8"
                        },
                        {
                            "src": "/Handlers/ImageLoader.ashx?imageID=191219&sz=400x266",
                            "width": "90",
                            "rel": "9"
                        }
                    ]
                }
            }
        ]
    }
}
```

Como realizar uma busca por quartos disponiveis :
```
POST : /buscar
body{
    checkin:    20/01/2019
    checkout:   27/01/2019
    ucUrl:      SearchResultsByRoom
    nrooms:     (quantidade de quartos)
    ad:         (quantidade de adultos)
    ch:         (quantidade de crianças)
    q:          (codigo do hotel)
}
```
* os campos checkin e checkout são obrigatórios

Exemplo de resposta para uma busca por quartos disponiveis :
```json
{
    "success": true,
    "data": {
        "rooms": [
            {
                "gallery": [
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=189952.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=189952"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=152609.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=152609"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=189950.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=189950"
                    }
                ],
                "url": "/ToolTips/PopupRoom.aspx?q=5462&roomID=33921&rnd=636782191802206886&iframe=true&width=1020&height=600&sid=9b0b6b4f-daaf-4806-8025-a7e005a29f6f",
                "title": "Standard",
                "short_description": "Ideal para relaxar. Os quartos dispõem de diversos serviços para garantir uma estadia confortável e agradável. Todos os apartamentos Stan... ",
                "price_options": [
                    {
                        "rateName": "Melhor Tarifa Disponível",
                        "extras": [
                            "Permite Cancelamento",
                            "Pensão Completa",
                            "Internet Wi-Fi",
                            "Estacionamento"
                        ],
                        "text": "R$ 1.201,43",
                        "value": "1201,429"
                    },
                    {
                        "rateName": "BLACK FRIDAY FINAL DE SEMANA E FERIADOS",
                        "extras": [
                            "Não Reembolsável",
                            "Pensão Completa",
                            "Internet Wi-Fi",
                            "Estacionamento"
                        ],
                        "text": "R$ 1.201,43",
                        "value": "1201,429"
                    },
                    {
                        "rateName": "BLACK FRIDAY MEIO DE SEMANA",
                        "extras": [
                            "Não Reembolsável",
                            "Pensão Completa",
                            "Internet Wi-Fi",
                            "Estacionamento"
                        ],
                        "text": "R$ 1.201,43",
                        "value": "1201,429"
                    }
                ]
            },
            {
                "gallery": [
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=167874.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=167874"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=167875.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=167875"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=166063.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=166063"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=166064.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=166064"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=166065.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=166065"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=166066.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=166066"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=166067.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=166067"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=166069.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=166069"
                    }
                ],
                "url": "/ToolTips/PopupRoom.aspx?q=5462&roomID=35261&rnd=636782191802206886&iframe=true&width=1020&height=600&sid=9b0b6b4f-daaf-4806-8025-a7e005a29f6f",
                "title": "Luxo - Ala Magique",
                "short_description": "Uma viagem no tempo! A ala Magique promete agradar especialmente às crianças e adolescentes, pela decoração medieval e pela localização b... ",
                "price_options": [
                    {
                        "rateName": "Melhor Tarifa Disponível",
                        "extras": [
                            "Permite Cancelamento",
                            "Pensão Completa",
                            "Internet Wi-Fi",
                            "Estacionamento"
                        ],
                        "text": "R$ 1.201,43",
                        "value": "1201,429"
                    },
                    {
                        "rateName": "BLACK FRIDAY FINAL DE SEMANA E FERIADOS",
                        "extras": [
                            "Não Reembolsável",
                            "Pensão Completa",
                            "Internet Wi-Fi",
                            "Estacionamento"
                        ],
                        "text": "R$ 1.201,43",
                        "value": "1201,429"
                    },
                    {
                        "rateName": "BLACK FRIDAY MEIO DE SEMANA",
                        "extras": [
                            "Não Reembolsável",
                            "Pensão Completa",
                            "Internet Wi-Fi",
                            "Estacionamento"
                        ],
                        "text": "R$ 1.201,43",
                        "value": "1201,429"
                    }
                ]
            },
            {
                "gallery": [
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=152620.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=152620"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=152621.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=152621"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=189959.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=189959"
                    }
                ],
                "url": "/ToolTips/PopupRoom.aspx?q=5462&roomID=33922&rnd=636782191802206886&iframe=true&width=1020&height=600&sid=9b0b6b4f-daaf-4806-8025-a7e005a29f6f",
                "title": "Luxo",
                "short_description": "Confortavelmente decorado para fazer da sua estadia um momento de prazer e bem-estar. Os quartos da categoria Luxo contam Ar climatizado,... ",
                "price_options": [
                    {
                        "rateName": "Melhor Tarifa Disponível",
                        "extras": [
                            "Permite Cancelamento",
                            "Pensão Completa",
                            "Internet Wi-Fi",
                            "Estacionamento"
                        ],
                        "text": "R$ 1.251,43",
                        "value": "1251,429"
                    },
                    {
                        "rateName": "BLACK FRIDAY FINAL DE SEMANA E FERIADOS",
                        "extras": [
                            "Não Reembolsável",
                            "Pensão Completa",
                            "Internet Wi-Fi",
                            "Estacionamento"
                        ],
                        "text": "R$ 1.251,43",
                        "value": "1251,429"
                    },
                    {
                        "rateName": "BLACK FRIDAY MEIO DE SEMANA",
                        "extras": [
                            "Não Reembolsável",
                            "Pensão Completa",
                            "Internet Wi-Fi",
                            "Estacionamento"
                        ],
                        "text": "R$ 1.251,43",
                        "value": "1251,429"
                    }
                ]
            },
            {
                "gallery": [
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=152623.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=152623"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=152624.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=152624"
                    },
                    {
                        "src": "/Handlers/ImageLoader.ashx?imageID=152625.jpg",
                        "alt": "/ToolTips/Photo.aspx?sz=400x275&imageID=152625"
                    }
                ],
                "url": "/ToolTips/PopupRoom.aspx?q=5462&roomID=33923&rnd=636782191802206886&iframe=true&width=1020&height=600&sid=9b0b6b4f-daaf-4806-8025-a7e005a29f6f",
                "title": "Luxo Superior",
                "short_description": "Exclusividade e requinte. Todos os quartos luxo superior contam com Ar climatizado, TV LCD 32”, SKY, frigobar, telefone, cofre e secador ... ",
                "price_options": [
                    {
                        "rateName": "Melhor Tarifa Disponível",
                        "extras": [
                            "Permite Cancelamento",
                            "Pensão Completa",
                            "Internet Wi-Fi",
                            "Estacionamento"
                        ],
                        "text": "R$ 1.442,86",
                        "value": "1442,857"
                    },
                    {
                        "rateName": "BLACK FRIDAY FINAL DE SEMANA E FERIADOS",
                        "extras": [
                            "Não Reembolsável",
                            "Pensão Completa",
                            "Internet Wi-Fi",
                            "Estacionamento"
                        ],
                        "text": "R$ 1.442,86",
                        "value": "1442,857"
                    },
                    {
                        "rateName": "BLACK FRIDAY MEIO DE SEMANA",
                        "extras": [
                            "Não Reembolsável",
                            "Pensão Completa",
                            "Internet Wi-Fi",
                            "Estacionamento"
                        ],
                        "text": "R$ 1.442,86",
                        "value": "1442,857"
                    }
                ]
            }
        ]
    }
}
```

### Contato
email: gustavopinali@gmail.com

