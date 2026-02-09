// Berger Lookup (NL / BE / DE)
// Note: file extension is .ts, but the content is plain modern JavaScript (no TypeScript syntax),
// so it can run directly in the browser as an ES module.

// --------------------
// Data
// --------------------
const VALUES_NL = [["Amsterdam Centraal + Gooi","Bergnet","Hoogwout"],["Amsterdam West","Hoogwout",null],["Utrecht","Modern",null],["West Flevoland","Bergnet",null],["Noord-Oost Noord-Holland","Theo Rood",null],["Noord-West Noord-Holland","Haulo Berging",null],["Noord-Brabant + stukje Gelderland","van Eijck",null],["Gelderland","van Eijck",null],["Wisselgebied Amersfoort","van Eijck Ede","Bergnet"],["Oost-Flevoland + Zwolle etc.","Stouwdam",null],["Wisselgebied Apeldoorn","van Eijck Ede","Duiven"],["Zeeland","Kuzee",null],["Wisselgebied Eindhoven","van Eijck Eindhoven","Herpertz Nederweert"]];
const RANGES_NL = [[1011,1019,0],[1021,1028,0],[1031,1036,0],[1037,1037,1],[1041,1044,0],[1046,1047,1],[1051,1059,0],[1060,1060,1],[1061,1068,0],[1069,1069,1],[1071,1079,0],[1081,1083,0],[1086,1087,0],[1091,1098,0],[1101,1109,0],[1111,1115,0],[1117,1119,1],[1121,1121,1],[1127,1127,1],[1131,1132,1],[1135,1135,1],[1141,1141,1],[1145,1145,1],[1151,1151,1],[1153,1154,1],[1161,1161,1],[1165,1165,1],[1171,1171,1],[1175,1175,1],[1181,1183,1],[1184,1184,0],[1185,1188,1],[1191,1191,0],[1211,1218,0],[1221,1223,0],[1231,1231,2],[1241,1241,0],[1243,1244,0],[1251,1252,0],[1261,1262,0],[1271,1277,0],[1309,1309,3],[1311,1319,3],[1321,1329,3],[1331,1336,3],[1338,1339,3],[1341,1341,3],[1343,1343,3],[1349,1349,3],[1351,1359,3],[1361,1364,3],[1381,1384,0],[1391,1391,0],[1393,1394,0],[1396,1396,0],[1398,1399,0],[1401,1406,0],[1411,1412,0],[1421,1424,1],[1427,1427,1],[1431,1432,1],[1435,1438,1],[1441,1448,1],[1451,1452,1],[1454,1454,1],[1456,1456,1],[1458,1458,1],[1461,1461,1],[1462,1464,4],[1471,1471,1],[1472,1477,4],[1481,1483,1],[1484,1485,5],[1486,1489,1],[1501,1509,1],[1511,1511,1],[1521,1521,1],[1525,1525,1],[1531,1531,1],[1534,1534,1],[1536,1536,1],[1541,1541,1],[1544,1544,1],[1546,1546,1],[1551,1551,1],[1561,1562,1],[1566,1567,1],[1601,1602,4],[1606,1609,4],[1611,1611,4],[1613,1614,4],[1616,1617,4],[1619,1619,4],[1621,1625,4],[1627,1628,4],[1631,1631,4],[1633,1634,4],[1636,1636,4],[1641,1643,4],[1645,1648,4],[1652,1652,4],[1654,1655,4],[1657,1658,4],[1661,1663,4],[1671,1671,4],[1674,1674,4],[1676,1676,4],[1678,1679,4],[1681,1689,4],[1691,1693,4],[1695,1697,4],[1701,1706,5],[1711,1711,4],[1713,1713,4],[1715,1716,4],[1718,1719,4],[1721,1724,5],[1731,1731,4],[1732,1732,5],[1733,1734,4],[1735,1736,5],[1738,1738,5],[1741,1742,5],[1744,1744,5],[1746,1747,5],[1749,1749,5],[1751,1757,5],[1759,1759,5],[1761,1761,5],[1764,1764,5],[1766,1769,5],[1771,1771,4],[1773,1775,4],[1777,1779,4],[1781,1789,5],[1811,1817,5],[1821,1827,5],[1829,1829,5],[1831,1832,5],[1834,1834,5],[1841,1844,5],[1846,1847,5],[1851,1853,5],[1861,1862,5],[1865,1865,5],[1871,1871,5],[1873,1873,5],[1901,1902,1],[1906,1906,5],[1911,1911,1],[1921,1921,1],[1931,1931,5],[1934,1935,5],[1941,1949,1],[1951,1951,1],[1961,1969,1],[1971,1976,1],[1981,1981,1],[1985,1985,1],[1991,1992,1],[2011,2015,1],[2019,2019,1],[2021,2026,1],[2031,2037,1],[2041,2042,1],[2051,2051,1],[2061,2061,1],[2063,2065,1],[2071,2071,1],[2082,2082,1],[2101,2106,1],[2111,2111,1],[2114,2114,1],[2116,2116,1],[2121,2121,1],[2131,2136,1],[2141,2144,1],[2151,2154,1],[2181,2182,1],[3372,3372,6],[3401,3405,2],[3417,3417,2],[3431,3433,2],[3435,3439,2],[3441,3449,2],[3451,3454,2],[3461,3461,2],[3481,3481,2],[3511,3515,2],[3521,3528,2],[3531,3534,2],[3541,3546,2],[3551,3555,2],[3561,3566,2],[3571,3573,2],[3581,3585,2],[3601,3608,2],[3611,3612,2],[3615,3615,2],[3621,3621,2],[3625,3625,2],[3631,3631,2],[3632,3634,0],[3701,3708,2],[3709,3709,7],[3711,3711,7],[3712,3712,2],[3721,3723,2],[3731,3732,2],[3734,3735,2],[3737,3739,2],[3741,3744,0],[3749,3749,0],[3751,3752,0],[3754,3755,0],[3761,3766,0],[3768,3768,0],[3769,3769,2],[3771,3776,7],[3781,3781,7],[3784,3785,8],[3791,3792,7],[3794,3794,7],[3811,3819,8],[3821,3826,8],[3828,3829,8],[3831,3836,8],[3841,3844,9],[3845,3845,10],[3846,3846,9],[3847,3847,10],[3848,3849,9],[3851,3853,10],[3861,3864,8],[3871,3871,8],[3881,3882,10],[3886,3886,10],[3888,3888,10],[3891,3897,3],[3898,3898,9],[3899,3899,3],[3901,3907,7],[3911,3912,7],[3921,3922,7],[3925,3925,7],[3927,3927,7],[3931,3931,7],[3941,3941,7],[3945,3945,7],[3947,3947,7],[3951,3951,7],[3953,3953,7],[3956,3956,7],[3958,3959,7],[3961,3962,7],[3971,3972,7],[3981,3981,2],[3984,3985,7],[3991,3995,2],[3997,3997,7],[4251,4251,6],[4254,4255,6],[4261,4261,6],[4264,4269,6],[4271,4271,6],[4273,4273,6],[4281,4281,6],[4283,4288,6],[4331,4339,11],[4341,4341,11],[4351,4354,11],[4356,4357,11],[4361,4361,11],[4363,4365,11],[4371,4371,11],[4373,4374,11],[4381,4389,11],[4421,4421,11],[4431,4431,11],[4433,4438,11],[4441,4441,11],[4443,4444,11],[4451,4451,11],[4453,4456,11],[4458,4458,11],[4461,4465,11],[4471,4472,11],[4474,4475,11],[4481,4482,11],[4484,4486,11],[4491,4491,11],[4493,4494,11],[4501,4501,11],[4503,4508,11],[4511,4511,11],[4513,4513,11],[4515,4515,11],[4521,4522,11],[4524,4525,11],[4527,4529,11],[4531,4533,11],[4535,4539,11],[4541,4543,11],[4551,4551,11],[4553,4554,11],[4561,4562,11],[4564,4569,11],[4571,4571,11],[4574,4576,11],[4581,4581,11],[4583,4589,11],[4611,4617,6],[4621,4625,6],[4631,4631,6],[4634,4635,6],[4641,4641,6],[4651,4652,6],[4655,4655,6],[4661,4661,6],[4664,4664,6],[4671,4671,6],[4675,4675,6],[4681,4681,6],[4691,4691,6],[4693,4698,6],[4701,4709,6],[4711,4711,6],[4714,4715,6],[4721,4722,6],[4724,4727,6],[4731,4731,6],[4735,4735,6],[4741,4741,6],[4744,4744,6],[4751,4751,6],[4754,4754,6],[4756,4756,6],[4758,4759,6],[4761,4762,6],[4765,4766,6],[4771,4772,6],[4781,4782,6],[4791,4791,6],[4793,4794,6],[4796,4797,6],[4811,4819,6],[4822,4827,6],[4834,4839,6],[4841,4841,6],[4844,4845,6],[4847,4847,6],[4849,4849,6],[4851,4851,6],[4854,4856,6],[4858,4859,6],[4861,4861,6],[4871,4879,6],[4881,4882,6],[4884,4885,6],[4891,4891,6],[4901,4909,6],[4911,4911,6],[4921,4921,6],[4924,4924,6],[4926,4927,6],[4931,4931,6],[4941,4942,6],[4944,4944,6],[5011,5015,6],[5017,5018,6],[5021,5022,6],[5025,5026,6],[5032,5032,6],[5035,5038,6],[5041,5049,6],[5051,5053,6],[5056,5057,6],[5059,5059,6],[5061,5063,6],[5066,5066,6],[5071,5071,6],[5074,5074,6],[5076,5076,6],[5081,5081,6],[5084,5084,6],[5085,5085,12],[5087,5087,12],[5089,5089,6],[5091,5091,12],[5094,5096,12],[5101,5107,6],[5109,5109,6],[5111,5111,6],[5113,5113,6],[5121,5122,6],[5124,5126,6],[5131,5131,6],[5133,5133,6],[5141,5146,6],[5151,5152,6],[5154,5154,6],[5156,5158,6],[5161,5161,6],[5165,5165,6],[5171,5172,6],[5175,5176,6],[5211,5213,6],[5215,5216,6],[5221,5224,6],[5231,5237,6],[5241,5249,6],[5251,5258,6],[5261,5264,6],[5266,5266,6],[5268,5268,6],[5271,5272,6],[5275,5275,6],[5281,5283,6],[5291,5294,6],[5296,5296,6],[5298,5298,6],[5301,5302,6],[5305,5308,6],[5311,5311,6],[5313,5318,6],[5321,5321,6],[5324,5325,6],[5327,5328,6],[5331,5331,6],[5333,5335,6],[5341,5349,6],[5351,5359,6],[5361,5361,6],[5363,5364,6],[5366,5368,6],[5371,5371,6],[5373,5375,6],[5381,5384,6],[5386,5386,6],[5388,5388,6],[5391,5392,6],[5394,5398,6],[5401,5406,6],[5408,5408,6],[5411,5411,6],[5421,5422,12],[5423,5423,6],[5425,5425,12],[5427,5427,6],[5437,5439,6],[5453,5453,6],[5461,5467,6],[5469,5469,6],[5471,5473,6],[5476,5476,6],[5481,5482,6],[5491,5492,6],[5501,5509,12],[5511,5513,12],[5521,5521,12],[5524,5525,12],[5527,5529,12],[5531,5531,12],[5534,5534,12],[5541,5541,12],[5551,5556,12],[5561,5561,12],[5563,5563,12],[5571,5571,12],[5575,5575,12],[5581,5583,12],[5591,5591,12],[5595,5595,12],[5611,5617,12],[5621,5629,12],[5631,5633,12],[5641,5647,12],[5651,5658,12],[5661,5667,12],[5671,5674,12],[5681,5685,12],[5688,5689,6],[5691,5692,12],[5694,5694,12],[5701,5709,12],[5711,5712,12],[5715,5715,12],[5721,5722,12],[5724,5725,12],[5731,5731,12],[5735,5735,12],[5737,5738,12],[5741,5741,12],[5751,5754,12],[5756,5756,12],[5761,5761,12],[5763,5763,12],[6001,6004,12],[6006,6006,12],[6021,6021,12],[6023,6024,12],[6026,6029,12],[6511,6512,6],[6515,6515,7],[6521,6524,6],[6531,6538,6],[6541,6546,6],[6551,6551,6],[6566,6566,7],[6577,6579,7],[6601,6606,6],[6611,6613,6],[6615,6617,6],[6621,6621,6],[6624,6624,6],[6626,6629,6],[6631,6631,6],[6634,6634,6],[6641,6642,6],[6644,6645,6],[6651,6655,6],[6657,6659,6],[6661,6663,7],[6665,6665,7],[6675,6678,7],[6681,6681,7],[6684,6687,7],[6691,6691,7],[6701,6709,7],[6711,6718,7],[6721,6721,7],[6731,6733,7],[6741,6741,7],[6744,6745,7],[6811,6816,7],[6821,6828,7],[6831,6836,7],[6841,6846,7],[6851,6852,7],[6861,6862,7],[6865,6866,7],[6869,6869,7],[6871,6871,7],[6874,6874,7],[6877,6877,7],[6881,6883,7],[6891,6891,7],[6901,6905,7],[6909,6909,7],[6911,6911,7],[6913,6917,7],[6921,6924,7],[6931,6932,7],[6941,6942,7],[6951,6953,7],[6955,6955,7],[6981,6984,7],[6986,6988,7],[6991,6991,7],[6994,6994,7],[6996,6999,7],[7001,7009,7],[7031,7031,7],[7035,7039,7],[7041,7041,7],[7044,7044,7],[7046,7048,7],[7225,7225,7],[7311,7317,10],[7321,7329,10],[7331,7336,10],[7339,7339,10],[7341,7341,10],[7345,7346,10],[7351,7352,7],[7384,7384,10],[7391,7392,10],[7395,7396,10],[7397,7397,9],[7411,7413,10],[7415,7419,10],[7421,7427,10],[7429,7429,10],[7433,7433,10],[7439,7439,10],[8011,8017,9],[8019,8019,9],[8021,8025,9],[8031,8034,9],[8041,8043,9],[8051,8052,9],[8071,8072,9],[8075,8076,10],[8077,8077,9],[8079,8079,9],[8081,8082,9],[8084,8085,9],[8091,8091,9],[8094,8097,9],[8161,8162,9],[8166,8167,9],[8171,8172,9],[8181,8181,9],[8191,8191,9],[8193,8194,9],[8196,8196,9],[8198,8198,9],[8211,8212,3],[8218,8218,3],[8219,8219,9],[8222,8226,3],[8231,8233,3],[8239,8239,3],[8241,8245,3],[8251,8256,9],[8265,8266,9],[8274,8276,9],[8278,8278,9]].sort((a,b) => a[0]-b[0]);

const VALUES_BE = [["België","Degrave Middelkerke",null],["België","Van Looy",null],["België","MCT Verheye Depannage",null],["België","Lybaert",null],["België","Vercauteren",null],["België","VDC depannage",null],["België","Hamse Sleepdienst",null],["België","Cronos Depannage",null],["België","choffray depannage",null],["België","Bayards depannage",null],["België","Geen vaste berger (zwarte zone)",null],["België","Jan De Plecker",null]];
const RANGES_BE = [[8000,8499,0],[8600,8699,0],[7500,7999,1],[8500,8599,1],[8710,8999,1],[8700,8700,2],[9800,9899,2],[9000,9099,3],[9900,9999,3],[9100,9299,4],[2000,2199,5],[2300,2399,5],[2600,2699,5],[2900,2999,5],[2200,2299,6],[2400,2599,6],[2800,2899,6],[3500,3999,6],[4000,4699,7],[4700,4799,8],[4950,4999,8],[4800,4949,9],[5500,5599,10],[6600,6999,10],[1000,1999,11],[3000,3399,11],[5000,5499,11],[5600,6599,11],[7000,7499,11],[9300,9799,11]].sort((a,b) => a[0]-b[0]);

const DE_BERGERS = [{"name":"Bergungsdienst Brameier Schopsdorf GmbH","standplaats":"Schopsdorf","phone":"+493922575013","ranges":[[39000,39999],[10000,13999],[14000,14999],[6000,6999]]},{"name":"Wetterau Leipzig","standplaats":"Leipzig","phone":"+491704941738","ranges":[[4000,4999],[6000,6999],[8000,8999]]},{"name":"Schleppi","standplaats":"Saarbrücken","phone":"+4915114522990","ranges":[[66000,66999],[54000,54999],[56000,56999]]},{"name":"Rouven","standplaats":"Hannover","phone":"+491735954725","ranges":[[30000,30999],[31000,31999],[38000,38999]]},{"name":"Ronald","standplaats":"Potsdam","phone":"+491721671306","ranges":[[14000,14999],[10000,13999],[16000,16999]]},{"name":"Auto-Walther (Bosch Service)","standplaats":"Dresden","phone":"+49352002500","ranges":[[1000,1999],[2000,2999],[9000,9999]]},{"name":"Andreas","standplaats":"Hamburg","phone":"+491794549014","ranges":[[20000,21999],[21000,22999],[23000,23999]]},{"name":"Tobias Bissinger","standplaats":"Karlsruhe","phone":"+491718849717","ranges":[[76000,76999],[75000,75999],[67000,67999],[68000,68999]]},{"name":"Auto-Bissinger GmbH","standplaats":"Pforzheim","phone":"+497231605010","email":"info@auto-bissinger.de","ranges":[[75000,75999],[76000,76999],[70000,70999],[71000,71999]]},{"name":"Berger Stuttgart","standplaats":"Stuttgart","phone":"+4915121971477","ranges":[[70000,70999],[71000,71999],[72000,72999],[73000,73999]]},{"name":"Bohler Stephan","standplaats":"Zuid-Duitsland (mobiel)","phone":"+4917623705028","ranges":[[86000,86999],[87000,87999],[88000,88999]]},{"name":"RIGRA","standplaats":"München","phone":"+4986627575","ranges":[[80000,81999],[82000,82999],[83000,83999],[84000,84999]]},{"name":"Fasold","standplaats":"München","phone":"+491707202999","ranges":[[80000,81999],[82000,82999],[83000,83999],[84000,84999]]},{"name":"Mario Haake / Wüst","standplaats":"Frankfurt am Main","phone":"+4915115087403","ranges":[[60000,60999],[61000,61999],[63000,63999],[64000,64999],[35000,35999]]},{"name":"Bott","standplaats":"Frankfurt (west)","phone":"+491704516981","ranges":[[60000,60999],[61000,61999],[63000,63999],[55000,55999]]},{"name":"Abschleppdienst Meyer","standplaats":"Frankfurt am Main","phone":"+491715246237","email":"info@abschleppdienst-meyer.de","ranges":[[60000,60999],[61000,61999],[63000,63999],[64000,64999]]},{"name":"Abschleppdienst Bröker GmbH","standplaats":"Viersen","phone":"+492162658888","email":"Britta.Thill@abschleppdienst-broeker.de","ranges":[[41000,41999],[42000,42999],[47000,47999],[50000,50999],[52000,52999]]},{"name":"Automobile Krampe GmbH & Co. KG","standplaats":"Reken","phone":"+492362606260","email":"info@automobile-krampe.de","ranges":[[48000,48999],[49000,49999],[46000,46999],[47000,47999]]},{"name":"Koopmann Kirchhatten","standplaats":"Hatten","phone":"+494482393","email":"info@koopmann-kfz.de","ranges":[[26000,26999],[27000,27999],[28000,28999]]},{"name":"Lenz Abschleppdienst Adenau e.K.","standplaats":"Adenau","phone":"+4926919380770","email":"info@abschleppdienst-adenau.de","ranges":[[53000,53999],[54000,54999],[56000,56999]]},{"name":"Swientek & Gläser GmbH","standplaats":"Weißenfels","phone":"+493443302074","email":"Info@swientek-glaeser.de","ranges":[[6000,6999]]},{"name":"Abschleppdienst Kruger GmbH","standplaats":"Anröchte","phone":"+4929479759614","email":"info@abschleppdienst-krueger.de","ranges":[[59000,59999],[57000,57999],[58000,58999]]},{"name":"Auge Abschleppservice","standplaats":"Kist","phone":"+49930690600","email":"s.heyd@auge-service.de","ranges":[[97000,97999],[90000,90999],[60000,60999],[61000,61999]]}];

const ADDRESS_DE = {"Andreas Hagen":{"official":"Andreas Hagen Abschleppdienst Gütersloh","address":"Franz-Birkhan-Ring 20, 33330","city":"Gütersloh"},"Auge":{"official":"Augé GmbH Kist | Autovermietung | Abschleppdienst | Kranverleih","address":"Ringstraße 6, 97270","city":"Kist"},"Auto-Schafer GmbH":{"official":"Auto Schäfer GmbH","address":"Wiesenweg 9, 35096","city":"Weimar (Lahn)"},"Benke":{"official":"Abschleppdienst Auto Benke GmbH","address":"An d. Zolltafel 3, 06526","city":"Sangerhausen"},"Bissinger":{"official":"Auto-Bissinger GmbH","address":"Philipp-Weber-Straße 4, 75177","city":"Pforzheim"},"Bott":{"official":"Bott Abschleppdienst GmbH","address":"Seeber-Flur 15, 55545","city":"Bad Kreuznach"},"Brameier":{"official":"Bergungsdienst Brameier Schopsdorf GmbH","address":"Industriestraße 7, 39291","city":"Schopsdorf"},"Broker":{"official":"Abschleppdienst Bröker GmbH","address":"Industriering 29, 41751","city":"Viersen"},"Dietrich":{"official":"DIETRICH GmbH","address":"An der Siegtalbrücke 16, 57080","city":"Siegen"},"Florke":{"official":"Flörke Lehrte","address":"Daimlerstrasse 15, 31275","city":"Lehrte"},"Frohlich":{"official":"Abschleppservice Fröhlich GmbH","address":"Meißner straße 35, 01723","city":"Wilsdruff"},"Gerd Muller/Schleppi Bjorn":{"official":"Abschleppdienst Gerd Müller GmbH","address":"Saarbrücker Straße 118, 66424","city":"Homburg"},"Gunster":{"official":"Autohaus Guenster Koblenz","address":"Robert-Bosch-Strasse 10, 56070","city":"Koblenz"},"Helmut Vorleitner":{"official":"Helmut Vorleitner e. K. - Autowerkstatt & Abschleppdienst","address":"Henschelring 5, 85551","city":"KIRCHHEIM BEI MÜNCHEN"},"Herbold Florian":{"official":"Abschlepp- und Bergedienst Florian Herbold e.K.","address":"Hofgartenstraße 25, 74626","city":"BRETZFELD"},"Hofmeister":{"official":"Hofmeister Abschlepp- und Bergungsdienst GmbH & Co.KG","address":"Kremser Straße 15, 93055","city":"REGENSBURG"},"Holldobler":{"official":"Hölldobler GmbH Leipheim","address":"Ulmer Strasse 11, 89340","city":"LEIPHEIM"},"Janicke":{"official":"Jänicke Truck- und Havariedienst GmbH","address":"Hauptstraße 51, 16727","city":"OBERKRÄMER"},"Josef Eichenseher":{"official":"Abschleppdienst Josef Eichenseher","address":"Muthmannstrasse 10, 80939","city":"MÜNCHEN"},"Josef Fasold":{"official":"Auto Fasold GmbH","address":"Ostendstraße 1, 86579","city":"WAIDHOFEN"},"Kaufmann spezialfahrzeuge":{"official":"Abschlepp- & Bergungs- & Pannendienst - Kaufmann & Sohn Spezialfahrzeuge","address":"Eichenstraße 3, 15537","city":"GRÜNHEIDE (MARK)"},"Klotzbach":{"official":"Klotzbach GmbH","address":"Karolinenstraße 88, 44793","city":"BOCHUM"},"Knaak":{"official":"Mobil Service Knaak GmbH","address":"Siegfriedstraße 8, 22851","city":"NORDERSTEDT"},"Struck":{"official":"Struck Bergung- und Pannendienst","address":"Rote Brücke 13, 22113","city":"HAMBURG"},"Krampe":{"official":"Automobile Krampe GmbH & Co. KG","address":"Alte Ziegelei 4, 48734","city":"REKEN"},"Lenz":{"official":"Lenz Abschleppdienst Adenau e.K.","address":"Im Broel 24, 53518","city":"ADENAU"},"Meyer":{"official":"Abschleppdienst Meyer","address":"Rodelheimer Landstrasse 53, 60487","city":"FRANKFURT AM MAIN"},"Peters Eschweiler":{"official":"Abschleppdienst Peters GmbH","address":"Grüner Weg 44, 52070","city":"AACHEN"},"Potsdam Nord":{"official":"RKA Abschleppdienst Potsdam GmbH","address":"Am Silbergraben 20, 14480","city":"POTSDAM"},"Schwientek & sohn":{"official":"Schwientek & Sohn","address":"Borsigstraße 12, 51381","city":"Leverkusen"},"Stickelbroeck":{"official":"Stickelbroeck Bramsche GmbH","address":"Igels Sand 12, 49565","city":"BRAMSCHE"},"Swientek & Glaser":{"official":"Swientek & Gläser GmbH","address":"Kleben 8, 06667","city":"Weißenfels"},"Walke":{"official":"Walke KFZ Service GmbH","address":"In den Neuwiesen 5, 34593","city":"Knüllwald"},"Wehner Motors":{"official":"Wehner-Motors GmbH & Co Kfz-Handel KG","address":"Doktor-Raabe-Straße 5, 36043","city":"Fulda"},"Winkelmann":{"official":"Winkelmann Autozentrum","address":"Kutenhauser Dorfstraße 12, 32425","city":"Minden"},"carcomplete 24":{"official":"Carcomplete24 GmbH","address":"Rudolstädter Straße 236, 99098","city":"ERFURT"},"j. Bauereiss":{"official":"Autoverleih & Abschleppdienst J.Bauereiß KG","address":"Werner-von-Siemens-Straße 15, 91413","city":"Neustadt an der Aisch"},"koopmann":{"official":"Koopmann Kraftfahrzeuge GmbH&Co.KG","address":"Adelheider Str. 46 b, 27755","city":"Delmenhorst"},"kruger":{"official":"Abschleppdienst Gerhard Krüger","address":"Boschstraße 12, 59609","city":"Anröchte"},"rigra":{"official":"Rigra GmbH, Abschlepp - und Bergungsdienst","address":"Traunsteiner Str. 16, 83313","city":"Siegsdorf"},"saller":{"official":"Crane Saller GmbH","address":"Betriebsstraße 14, 94469","city":"Deggendorf"},"schmidt":{"official":"Auto Schmidt Kfz-Meisterbetrieb Bergungsdienst A2 Pkw-Lkw-Bus","address":"Daimlerstraße 1, 31867","city":"Lauenau"}};
const ADDRESS_BE = {"Garage De Plecker-Pauwels nv":{"official":"Garage De Plecker-Pauwels nv","address":"Robbroekstraat 11, 1840","city":"Londerzeel"},"Depannage / Autohandel / Kraanverhuur Vercauteren & Zonen":{"official":"Depannage / Autohandel / Kraanverhuur Vercauteren & Zonen","address":"Vossekotstraat 1, 9100","city":"Sint-Niklaas"},"MCT Verheye Depannage":{"official":"MCT Verheye Depannage","address":"Eekhoutstraat 53, 8755","city":"Wingene"},"Depannage Van Looy":{"official":"Depannage Van Looy","address":"Lar Blok Z 7a, 8930","city":"Menen"},"TakeldienstVDC":{"official":"TakeldienstVDC","address":"Theo Coertjenslaan 17, 2960","city":"Brecht"},"Hamse Sleepdienst (24U/24U BEREIKBAAR)":{"official":"Hamse Sleepdienst (24U/24U BEREIKBAAR)","address":"Kanaalweg 71, 3980","city":"Tessenderlo-Ham"},"Garage Takelbedrijf Degrave BVBA 24/24 Takeldienst /Depannage /Recovery":{"official":"Garage Takelbedrijf Degrave BVBA 24/24 Takeldienst /Depannage /Recovery","address":"De Kalkaart 24, 8430","city":"Middelkerke"},"DEPANNAGE BAYARDS SPRL":{"official":"DEPANNAGE BAYARDS SPRL","address":"Av. de l'Indépendance 87, 4020","city":"Liège"},"Cronos Dépannage":{"official":"Cronos Dépannage","address":"Rue de l'Expansion 4, 4460","city":"Grâce-Hollogne"},"Dépannage Choffray":{"official":"Dépannage Choffray","address":"Ville du Bois 173, 6690","city":"Vielsalm"},"bvba Depannage Lybaert":{"official":"bvba Depannage Lybaert","address":"bus 1, Vliegtuiglaan 5, 9000","city":"Gent"},"Depannage Saint Jean":{"official":"Depannage Saint Jean","address":"Rue de Bellecourt 24, 7170","city":"Manage"}};
const BE_ALIAS = {"Jan De Plecker":"Garage De Plecker-Pauwels nv","Vercauteren":"Depannage / Autohandel / Kraanverhuur Vercauteren & Zonen","Verheye":"MCT Verheye Depannage","Van Looy":"Depannage Van Looy","VDC":"TakeldienstVDC","Hamse":"Hamse Sleepdienst (24U/24U BEREIKBAAR)","Degrave":"Garage Takelbedrijf Degrave BVBA 24/24 Takeldienst /Depannage /Recovery","Bayards":"DEPANNAGE BAYARDS SPRL","Cronos":"Cronos Dépannage","Choffray":"Dépannage Choffray","Lybaert":"bvba Depannage Lybaert","Saint Jean":"Depannage Saint Jean"};

// Default fallback when a postcode is outside all configured ranges
const FALLBACK_BY_COUNTRY = {
  NL: { name: "van Eijck", company: "Van Eijck Mobility" },
  BE: { name: "Jan De Plecker", company: "Garage De Plecker-Pauwels nv" },
  DE: { name: "Broker", company: "Abschleppdienst Bröker GmbH" },
};

// --------------------
// Utils
// --------------------
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function norm(s) {
  return String(s || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\b(gmbh|kg|ug|ag|bvba|nv|sprl|bv|bvb|sarl|sa|co|und|&|kfz|abschleppdienst|abschlepp|bergung|depannage|takeldienst)\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function pad5(n) {
  const s = String(n);
  return s.length >= 5 ? s : "0".repeat(5 - s.length) + s;
}

function extractDigits(s) {
  return (s.match(/\d+/g) || []).join("");
}

function cleanInput(raw) {
  return String(raw || "").trim().toUpperCase();
}

function detectCountryFromInput(raw) {
  const s = cleanInput(raw);
  const digits = extractDigits(s);

  // NL: often "1234AB" or "1234 AB"
  const nlLike = /^\d{4}\s*[A-Z]{2}$/.test(s.replace(/\s+/g,""));
  if (nlLike) return "NL";

  // DE: 5 digits
  if (/^\d{5}$/.test(digits) && digits.length === 5) return "DE";

  // Ambiguous 4-digit -> keep user selection
  if (/^\d{4}$/.test(digits) && digits.length === 4) return null;

  return null;
}

function parsePostcode(raw, country) {
  const s = cleanInput(raw);
  const digits = extractDigits(s);

  if (country === "DE") {
    const pc5 = (digits.length >= 5 ? digits.slice(0,5) : digits).padStart(5, "0");
    const num = Number(pc5); // leading zeros are fine
    return { pcStr: pc5, pcNum: num };
  }

  if (country === "BE") {
    const pc4 = digits.slice(0,4);
    const num = Number(pc4);
    return { pcStr: pc4, pcNum: num };
  }

  // NL: accept 4 digits or full 6-char (1234AB). We look up by PC4.
  const pc4 = digits.slice(0,4);
  const num = Number(pc4);
  const pc6 = (s.replace(/\s+/g,"").match(/^\d{4}[A-Z]{2}$/) || [])[0] || null;
  return { pcStr: pc6 || pc4, pcNum: num };
}

function lookupByRanges(pcNum, ranges, values) {
  // ranges: [[start,end,idx], ...] sorted by start
  let lo = 0;
  let hi = ranges.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const [a,b,idx] = ranges[mid];
    if (pcNum < a) hi = mid - 1;
    else if (pcNum > b) lo = mid + 1;
    else return { idx, value: values[idx], matched: true };
  }
  return { idx: null, value: null, matched: false };
}

function lookupDE(pcNum) {
  for (const b of DE_BERGERS) {
    for (const [a,c] of b.ranges) {
      if (pcNum >= a && pcNum <= c) return { berger: b, matched: true };
    }
  }
  return { berger: null, matched: false };
}

function getAddressFromBook(country, bergerName) {
  if (!bergerName) return null;

  if (country === "BE") {
    // direct, alias, fuzzy
    const direct = ADDRESS_BE[bergerName];
    if (direct) return direct;

    const aliasKey = BE_ALIAS[bergerName];
    if (aliasKey && ADDRESS_BE[aliasKey]) return ADDRESS_BE[aliasKey];

    const n = norm(bergerName);
    let best = null;
    let bestScore = 1e9;
    for (const key of Object.keys(ADDRESS_BE)) {
      const nk = norm(key);
      if (!nk) continue;
      if (nk === n || nk.includes(n) || n.includes(nk)) {
        const score = Math.abs(nk.length - n.length);
        if (score < bestScore) {
          bestScore = score;
          best = ADDRESS_BE[key];
        }
      }
    }
    return best;
  }

  if (country === "DE") {
    // direct, fuzzy
    const direct = ADDRESS_DE[bergerName];
    if (direct) return direct;

    const n = norm(bergerName);
    let best = null;
    let bestScore = 1e9;
    for (const key of Object.keys(ADDRESS_DE)) {
      const nk = norm(key);
      if (!nk) continue;
      if (nk === n || nk.includes(n) || n.includes(nk)) {
        const score = Math.abs(nk.length - n.length);
        if (score < bestScore) {
          bestScore = score;
          best = ADDRESS_DE[key];
        }
      }
    }
    return best;
  }

  return null;
}

function buildMapsQuery(country, pcStr, addressObj, standplaats) {
  const parts = [];
  if (addressObj && addressObj.address) parts.push(addressObj.address);
  if (addressObj && addressObj.city) parts.push(addressObj.city);
  if (parts.length === 0 && standplaats) parts.push(standplaats);
  if (parts.length === 0 && pcStr) parts.push(pcStr);
  if (country) parts.push(country === "NL" ? "Netherlands" : (country === "BE" ? "Belgium" : "Germany"));
  return parts.join(", ");
}

// --------------------
// Lookup (core)
// --------------------
function getBerger(rawPostcode, country) {
  const parsed = parsePostcode(rawPostcode, country);
  const pcStr = parsed.pcStr;
  const pcNum = parsed.pcNum;

  if (!pcStr || !pcNum || Number.isNaN(pcNum)) {
    return {
      country,
      input: rawPostcode,
      pcStr,
      matched: false,
      method: "invalid",
      error: "Onleesbare postcode.",
    };
  }

  if (country === "NL") {
    const hit = lookupByRanges(pcNum, RANGES_NL, VALUES_NL);
    if (hit.matched) {
      const gebied = hit.value[0];
      const primary = hit.value[1];
      const backup = hit.value[2];
      return {
        country,
        pcStr,
        matched: true,
        method: "range",
        berger: {
          name: primary,
          company: primary,
          phone: null,
          standplaats: null,
          extra: { gebied, backup },
        },
      };
    }

    const fb = FALLBACK_BY_COUNTRY.NL;
    return {
      country,
      pcStr,
      matched: false,
      method: "fallback-default",
      berger: {
        name: fb.name,
        company: fb.company,
        phone: null,
        standplaats: null,
        extra: { gebied: null, backup: null },
      },
    };
  }

  if (country === "BE") {
    const hit = lookupByRanges(pcNum, RANGES_BE, VALUES_BE);
    if (hit.matched) {
      const name = hit.value[1];
      const phone = hit.value[2];
      return {
        country,
        pcStr,
        matched: true,
        method: "range",
        berger: {
          name,
          company: name,
          phone: phone || null,
          standplaats: null,
          extra: {},
        },
      };
    }

    const fb = FALLBACK_BY_COUNTRY.BE;
    return {
      country,
      pcStr,
      matched: false,
      method: "fallback-default",
      berger: {
        name: fb.name,
        company: fb.company,
        phone: null,
        standplaats: null,
        extra: {},
      },
    };
  }

  // DE
  const hit = lookupDE(pcNum);
  if (hit.matched) {
    return {
      country,
      pcStr,
      matched: true,
      method: "range",
      berger: {
        name: hit.berger.name,
        company: hit.berger.name,
        phone: hit.berger.phone || null,
        standplaats: hit.berger.standplaats || null,
        extra: {},
      },
    };
  }

  const fb = FALLBACK_BY_COUNTRY.DE;
  return {
    country,
    pcStr,
    matched: false,
    method: "fallback-default",
    berger: {
      name: fb.name,
      company: fb.company,
      phone: null,
      standplaats: null,
      extra: {},
    },
  };
}

// --------------------
// Map (Leaflet + Nominatim)
// --------------------
let map = null;
let marker = null;
let lastMapQuery = null;

function ensureMap() {
  if (map) return map;

  map = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: false,
  }).setView([52.1, 5.3], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  return map;
}

const GEO_CACHE = new Map(); // query -> {lat, lon, display_name}
async function geocode(query) {
  if (!query) return null;
  if (GEO_CACHE.has(query)) return GEO_CACHE.get(query);

  const url = "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + encodeURIComponent(query);
  try {
    const res = await fetch(url, { headers: { "Accept": "application/json" } });
    const data = await res.json();
    if (Array.isArray(data) && data[0]) {
      const hit = {
        lat: Number(data[0].lat),
        lon: Number(data[0].lon),
        display_name: data[0].display_name,
      };
      GEO_CACHE.set(query, hit);
      return hit;
    }
  } catch {
    // ignore
  }
  GEO_CACHE.set(query, null);
  return null;
}

async function showOnMap(query, label) {
  ensureMap();

  if (!query) {
    setStatus("Geen zoekterm voor kaart.", true);
    return;
  }

  lastMapQuery = query;
  setStatus("Kaart laden…", false);

  const hit = await geocode(query);
  if (!hit || Number.isNaN(hit.lat) || Number.isNaN(hit.lon)) {
    setStatus("Kaart: locatie niet gevonden.", true);
    return;
  }

  map.setView([hit.lat, hit.lon], 11);

  if (marker) marker.remove();
  marker = L.marker([hit.lat, hit.lon]).addTo(map);
  marker.bindPopup(label || query).openPopup();

  setStatus("", false);
}

// --------------------
// UI
// --------------------
const elPostcode = document.getElementById("postcode");
const elLand = document.getElementById("land");
const btnZoek = document.getElementById("btnZoek");
const btnCopy = document.getElementById("btnCopy");
const btnOpenMaps = document.getElementById("btnOpenMaps");
const btnRecenter = document.getElementById("btnRecenter");
const btnSelftest = document.getElementById("btnSelftest");

const elStatus = document.getElementById("status");
const elAutoHint = document.getElementById("autoHint");

const resultCard = document.getElementById("resultCard");
const pillLand = document.getElementById("pillLand");
const pillMatch = document.getElementById("pillMatch");
const pillMethod = document.getElementById("pillMethod");

const rName = document.getElementById("rName");
const rCompany = document.getElementById("rCompany");
const rPhone = document.getElementById("rPhone");
const rAddress = document.getElementById("rAddress");
const resultNote = document.getElementById("resultNote");

const progressWrap = document.getElementById("progressWrap");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

let lastResult = null;

function setStatus(msg, isWarn) {
  elStatus.textContent = msg || "";
  elStatus.className = isWarn ? "muted warn" : "muted";
}

function setProgress(on, pct, text) {
  progressWrap.style.display = on ? "block" : "none";
  progressBar.style.width = Math.max(0, Math.min(100, pct || 0)) + "%";
  progressText.textContent = text || "";
}

function autoDetectLand() {
  const det = detectCountryFromInput(elPostcode.value);
  if (!det) {
    elAutoHint.textContent = "";
    return;
  }
  elLand.value = det;
  elAutoHint.textContent = "Land automatisch gezet op " + det + ".";
}

function formatAddressLine(addressObj) {
  if (!addressObj) return "—";
  const parts = [];
  if (addressObj.address) parts.push(addressObj.address);
  if (addressObj.city) parts.push(addressObj.city);
  return parts.length ? parts.join(", ") : "—";
}

function renderResult(res) {
  lastResult = res;
  resultCard.style.display = "block";

  pillLand.textContent = "Land: " + res.country;
  pillMatch.textContent = res.matched ? "Match: JA" : "Match: NEE";
  pillMatch.className = "pill " + (res.matched ? "ok" : "warn");
  pillMethod.textContent = "Methode: " + res.method;
  pillMethod.className = "pill";

  const b = res.berger;
  const addressObj = getAddressFromBook(res.country, b && b.name);
  const displayCompany = (addressObj && addressObj.official) || (b && (b.company || b.name)) || "—";
  const displayAddress = formatAddressLine(addressObj);

  rName.textContent = (b && b.name) || "—";
  rCompany.textContent = displayCompany || "—";
  rPhone.textContent = (b && b.phone) ? String(b.phone) : "—";
  rAddress.textContent = displayAddress;

  const notes = [];
  if (res.country === "NL" && b && b.extra && b.extra.gebied) notes.push("Gebied: " + b.extra.gebied);
  if (res.country === "NL" && b && b.extra && b.extra.backup) notes.push("Backup: " + b.extra.backup);
  if (!res.matched) notes.push("Let op: deze postcode valt buiten de ingestelde ranges. Er wordt een fallback getoond.");
  resultNote.textContent = notes.join(" • ");

  const q = buildMapsQuery(res.country, res.pcStr, addressObj, b && b.standplaats);
  const label = (b && b.name ? b.name : "Berger") + (displayAddress !== "—" ? (" — " + displayAddress) : "");
  showOnMap(q, label);
}

function makeCopyText(res) {
  const b = res.berger;
  const addressObj = getAddressFromBook(res.country, b && b.name);
  const company = (addressObj && addressObj.official) || (b && (b.company || b.name)) || "";
  const address = formatAddressLine(addressObj);
  const phone = (b && b.phone) ? String(b.phone) : "";

  const lines = [
    "Land: " + res.country,
    "Postcode: " + res.pcStr,
    "Berger: " + (b && b.name ? b.name : ""),
    company ? ("Bedrijf: " + company) : null,
    phone ? ("Telefoon: " + phone) : null,
    address !== "—" ? ("Adres: " + address) : null,
  ].filter(Boolean);

  return lines.join("\n");
}

function openExternalMap(res) {
  const b = res.berger;
  const addressObj = getAddressFromBook(res.country, b && b.name);
  const q = buildMapsQuery(res.country, res.pcStr, addressObj, b && b.standplaats);
  const url = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  window.open(url, "_blank", "noopener,noreferrer");
}

btnZoek.addEventListener("click", () => {
  const country = elLand.value;
  const res = getBerger(elPostcode.value, country);
  if (res.error) {
    setStatus(res.error, true);
    resultCard.style.display = "none";
    return;
  }
  setStatus("", false);
  renderResult(res);
});

elPostcode.addEventListener("input", () => {
  autoDetectLand();
});

elPostcode.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btnZoek.click();
});

btnCopy.addEventListener("click", async () => {
  if (!lastResult) return;
  try {
    await navigator.clipboard.writeText(makeCopyText(lastResult));
    setStatus("Gekopieerd.", false);
    await sleep(900);
    setStatus("", false);
  } catch {
    setStatus("Kopiëren mislukt (browser blokkeert clipboard).", true);
  }
});

btnOpenMaps.addEventListener("click", () => {
  if (!lastResult) return;
  openExternalMap(lastResult);
});

btnRecenter.addEventListener("click", () => {
  if (!lastMapQuery) return;
  showOnMap(lastMapQuery, null);
});

// --------------------
// Self-test
// --------------------
async function runSelfTest() {
  setStatus("", false);
  setProgress(true, 0, "Self-test gestart…");

  const tests = [
    { country: "BE", from: 1000, to: 9999, pad: (n) => String(n) },
    { country: "DE", from: 1000, to: 99999, pad: (n) => pad5(n) },
  ];

  let total = 0;
  for (const t of tests) total += (t.to - t.from + 1);

  let done = 0;
  let missing = 0;
  let fallback = 0;

  for (const t of tests) {
    for (let n = t.from; n <= t.to; n++) {
      const pc = t.pad(n);
      const res = getBerger(pc, t.country);
      if (!res || !res.berger || !res.berger.name) missing++;
      if (!res.matched) fallback++;
      done++;

      if (done % 2500 === 0) {
        const pct = (done / total) * 100;
        const msg = "Bezig… " + done.toLocaleString("nl-NL") + " / " + total.toLocaleString("nl-NL") +
          " (fallback: " + fallback.toLocaleString("nl-NL") + ", missing: " + missing.toLocaleString("nl-NL") + ")";
        setProgress(true, pct, msg);
        await sleep(0);
      }
    }
  }

  const finalMsg = "Klaar. Totaal: " + total.toLocaleString("nl-NL") +
    " • fallback: " + fallback.toLocaleString("nl-NL") +
    " • missing: " + missing.toLocaleString("nl-NL");
  setProgress(true, 100, finalMsg);
  setStatus(missing === 0 ? "Self-test OK: elke postcode levert een resultaat op." : ("Self-test: er missen resultaten (" + missing + ")."), missing !== 0);

  await sleep(2500);
  setProgress(false, 0, "");
}

btnSelftest.addEventListener("click", () => {
  runSelfTest();
});

// init map
ensureMap();
