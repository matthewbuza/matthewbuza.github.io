/* Phases 6L/6M: explicit neutral Ac–Lr states. Geometry remains shared. */
(function(C){
 'use strict';
 const L=(elementary,middle,high)=>({elementary,middle,high}),elements={},isotopes={},sources={};
 const source=(key,organization,title,url,supports)=>sources[key]={organization,title,url,supports,accessed:'2026-09-13'};
 source('actAtomic','NIST','Periodic table: neutral ground-state configurations','https://www.nist.gov/document/periodictable2016pdf-0','Ac–Am: explicit 5f/6d/7s occupations; no generic filling-rule substitution.');
 source('actAbundance','CIAAW / IUPAC','Isotopic compositions 2024','https://www.ciaaw.org/isotopic-abundances.htm','Th-230/232, Pa-231 and U-234/235/238 terrestrial fractions; no fixed fraction for produced or trace-only isotopes.');
 source('actDecay','NNDC / Brookhaven','Nuclear Wallet Cards, April 2005','https://www.lnl.infn.it/wp-content/uploads/Nuclear_Wallet_Cards.pdf','Named evaluated snapshot: Ac-227; Th-228/230/232; Pa-231; U-234/235/238; Np-237; Pu-238/239/240. Primary decay modes; minor branches omitted in the student panel. Newer Ac-225, Pu-244 and Am values cited separately.');
 source('actAc225','NNDC / ENSDF','Ac-225 ground state in Ra-225 decay dataset','https://www.nndc.bnl.gov/nudat3/getdecaydataset.jsp?dsid=225ra+bM+decay+%2814.9+d%29&nucleus=225AC','Ac-225 half-life 9.920 days.');
 source('actPu244','NNDC / ENSDF','Pu-244 adopted levels, August 2017 evaluation','https://www.nndc.bnl.gov/ensnds/244/Pu/adopted.pdf','Pu-244 half-life 81.3 million years; predominantly alpha decay with a spontaneous-fission branch.');
 source('actAm241','NNDC / ENSDF','Am-241 adopted levels','https://www.nndc.bnl.gov/ensnds/241/Am/adopted.pdf','Am-241 half-life 432.6 years; primarily alpha decay.');
 source('actAm243','NNDC / ENSDF','Am-243 ground state in Bk-247 decay dataset','https://www.nndc.bnl.gov/nudat3/getdecaydataset.jsp?dsid=247bk+a+decay&nucleus=243AM','Am-243 half-life 7364 years.');
 source('actTherapy','US Department of Energy','Actinium-225 and targeted alpha therapy','https://www.energy.gov/orem/articles/terrapower-cardinal-health-isotek-and-doe-celebrate-historic-achievement-next','Specialized targeted alpha therapy and clinical research; no blanket claim of routine approved treatment.');
 source('actSpace','NASA','About plutonium-238','https://science.nasa.gov/planetary-science/programs/radioisotope-power-systems/about-plutonium-238/','Spacecraft radioisotope systems convert natural decay heat to electricity, rather than using a fission chain reaction.');
 source('actCosmic','Wallner et al. / Nature Communications','Live interstellar plutonium-244 in deep-sea reservoirs, 2015','https://www.nature.com/articles/ncomms6956','Detected tiny natural interstellar Pu-244 traces in deep-sea deposits; supports heavy-element formation studies.');
 source('actSmoke','US EPA','Americium in ionization smoke detectors','https://www.epa.gov/radtown/americium-ionization-smoke-detectors','Small enclosed Am-241 sources; do not tamper with the source or its shielding.');
 source('actFissile','US NRC','Fissile material','https://www.nrc.gov/reading-rm/basic-ref/glossary/fissile-material','Conceptual distinction between fissile and radioactive; U-235 and Pu-239.');
 source('actFertile','US NRC','Fertile material','https://www.nrc.gov/reading-rm/basic-ref/glossary/fertile-material','Fertile isotopes can be transformed into fissile isotopes by nuclear reactions; no procedures are included.');
 source('lateAtomic','NIST','Periodic table, June 2024','https://www.nist.gov/system/files/documents/2024/06/25/NIST_periodictable_June24_iupac.pdf','Cm–Lr neutral configurations, including Cm 6d1, No 5f14 and Lr 7p1. The published table retains representative Lr-262.');
 source('lateNuclear','IAEA / AMDC','NUBASE2020 evaluated nuclear properties, published 2021','https://www-nds.iaea.org/amdc/ame2020/NUBASE2020.pdf','Named evaluation for Cm-244/247, Bk-247/249, Cf-249/251/252, Es-252, Fm-257, Md-258 and No-259. Lr-262 is approximately 4 h; Lr-266 symmetric 22(14) h derives from the same sparse 11(+21,-5) h result used below.');
 source('lateLr262','NNDC / ENSDF','Lr-262 adopted levels','https://www.nndc.bnl.gov/ensnds/262/Lr/adopted.pdf','Approximately 4 h; electron-capture/positron decay to No-262 observed indirectly, branching unknown; SF below 10%; alpha decay not observed.');
 source('lateLr266','NNDC / ENSDF','Lr-266 tentative adopted level, 2019','https://www.nndc.bnl.gov/ensnds/266/Lr/adopted.pdf','Tentative ground-state assignment, 11 h with +21/-5 h uncertainty; spontaneous fission. Sparse events, not a precise well-established lifetime.');
 source('lateLrAtom','JAEA','First ionization potential of lawrencium','https://asrc.jaea.go.jp/soshiki/gr/schaedel-gr/Lr-IP/Lr-IP.htm','Measurements test calculations consistent with 7p1; ionization energy does not directly determine the full electron configuration by itself.');
 source('lateCmUse','NASA / JPL Planetary Data System','Mars Pathfinder alpha proton X-ray spectrometer','https://planetarydata.jpl.nasa.gov/img/data/mpf/rover/mprv_0001/document/apxsinst.htm','Cm-244 in planetary elemental-analysis instruments; no instrument construction or source-handling instructions included.');
 source('lateCfUse','Oak Ridge National Laboratory','Californium-252 and reactor startups','https://www.ornl.gov/news/ornls-californium-252-will-play-pivotal-role-new-reactor-startups','Specialized neutron-source applications, including reactor startup; no production or handling procedures included.');
 source('lateHistory','Lawrence Berkeley National Laboratory','The search for heavy elements','https://www2.lbl.gov/abc/wallchart/chapters/08/0.html','Es/Fm discovery history and identifying mendelevium one atom at a time; historical context only.');
 const rows=[
  {
    "z": 89,
    "name": "Actinium",
    "symbol": "Ac",
    "mass": 227,
    "f": 0,
    "d": 1,
    "ids": [
      225,
      227
    ],
    "words": [
      "Actinium (Ac) is a heavy, radioactive metal. Scientists study it for special cancer treatments.",
      "Actinium is element 89, the first member of the actinide row, with seven electron shells. It is extremely rare in nature and radioactive. Ac-225 is used in specialized cancer-treatment research.",
      "Actinium has [Rn] 6d¹ 7s², with no occupied 5f state. Ac-227 is its longest-lived naturally occurring isotope. Ac-225 is studied and used in specialized targeted alpha therapies, which direct radiation toward cancer cells. All actinium isotopes are radioactive. The displayed atom is simplified."
    ],
    "contextWords": [
      "Scientists study actinium in special medical facilities.",
      "Targeted alpha therapy uses a carrier molecule to direct radiation toward selected cells. Ac-225 is part of specialized treatment and clinical research.",
      "Ac-225 supports specialized targeted alpha therapy and clinical research. Its use involves radioactive medicines, not actinium metal in ordinary healthcare. Ac-227 also helps scientists study natural radioactive changes."
    ]
  },
  {
    "z": 90,
    "name": "Thorium",
    "symbol": "Th",
    "mass": 232,
    "f": 0,
    "d": 2,
    "ids": [
      228,
      230,
      232
    ],
    "words": [
      "Thorium (Th) is a heavy, radioactive metal found in rocks. Scientists study it as a possible energy resource.",
      "Thorium is element 90, a radioactive actinide with seven electron shells. Natural thorium is mostly Th-232, which changes very slowly. Scientists study thorium as a possible nuclear-energy resource.",
      "Thorium has [Rn] 6d² 7s², with no occupied 5f state. Th-232 dominates natural thorium and has a very long half-life, but it remains radioactive. Thorium has historical gas-mantle and specialized alloy uses. It is also studied as a nuclear-energy resource. The displayed atom is simplified."
    ],
    "contextWords": [
      "Some older lamps used thorium-containing parts that glowed when heated.",
      "Thorium was used in gas mantles and some specialized metal mixtures. Possible nuclear-energy uses remain an important research topic.",
      "Historical gas mantles and specialized alloys used thorium-containing materials. Th-232 is fertile: nuclear reactions can change it into a fissile isotope, one capable of sustaining a fission chain reaction with appropriate neutrons. This is a conceptual explanation, not a fuel-production simulation."
    ]
  },
  {
    "z": 91,
    "name": "Protactinium",
    "symbol": "Pa",
    "mass": 231,
    "f": 2,
    "d": 1,
    "ids": [
      231
    ],
    "words": [
      "Protactinium (Pa) is a very rare, heavy radioactive metal. It helped scientists understand the actinide family.",
      "Protactinium is element 91, a radioactive actinide with seven electron shells. Pa-231 is its principal long-lived natural isotope. Rarity and radioactivity limit practical uses.",
      "Protactinium has [Rn] 5f² 6d¹ 7s², so both 5f and 6d are occupied. Pa-231 is its longest-lived natural isotope. Its discovery helped scientists organize the actinide series. Rarity, radioactivity and cost limit practical uses mainly to research. The displayed atom is simplified."
    ],
    "contextWords": [
      "Scientists use tiny amounts of protactinium to study atoms and rocks.",
      "Protactinium mainly supports scientific research. Its natural radioactive changes help scientists investigate the history of Earth materials.",
      "Pa-231 is part of the natural uranium-235 decay chain. Isotope measurements support studies of geological and ocean processes. Its rarity and radioactivity limit ordinary industrial applications."
    ]
  },
  {
    "z": 92,
    "name": "Uranium",
    "symbol": "U",
    "mass": 238,
    "f": 3,
    "d": 1,
    "ids": [
      234,
      235,
      238
    ],
    "words": [
      "Uranium (U) is a heavy, radioactive metal found in rocks. It helps provide energy in nuclear power plants.",
      "Uranium is element 92, a radioactive actinide with seven electron shells. Most natural uranium is U-238, while a small amount is U-235. Nuclear power plants use energy released by changes in atomic nuclei.",
      "Uranium has [Rn] 5f³ 6d¹ 7s². U-238 dominates natural uranium; the less common U-235 can sustain a fission chain reaction with appropriate neutrons. This supports nuclear-energy applications. Uranium compounds can be chemically toxic, and radiation also requires controlled handling. The displayed atom is simplified."
    ],
    "contextWords": [
      "Nuclear power plants use energy from changes inside atomic nuclei.",
      "Fission means splitting a heavy nucleus. U-235 can help sustain a chain of these reactions in nuclear energy systems.",
      "U-235 is fissile, while U-238 is fertile: nuclear reactions can change a fertile isotope into a fissile one. These terms describe nuclear behavior, not ordinary chemical bonding. U-234, U-235 and U-238 have the same neutral electron configuration but different nuclear properties."
    ]
  },
  {
    "z": 93,
    "name": "Neptunium",
    "symbol": "Np",
    "mass": 237,
    "f": 4,
    "d": 1,
    "ids": [
      237
    ],
    "words": [
      "Neptunium (Np) is a heavy, radioactive metal. Scientists mostly make it for specialized research.",
      "Neptunium is element 93, a radioactive actinide with seven electron shells. It is the first transuranium element, meaning its atomic number is greater than 92. Only tiny natural traces occur; most is produced in reactors.",
      "Neptunium has [Rn] 5f⁴ 6d¹ 7s². It is the first transuranium element, with an atomic number beyond uranium’s 92. Np-237 is its representative isotope, and all neptunium isotopes are radioactive. Most neptunium is produced through nuclear reactions for research and specialized nuclear applications. The displayed atom is simplified."
    ],
    "contextWords": [
      "Neptunium helps scientists learn about very heavy atoms.",
      "Most neptunium is produced through nuclear reactions. Tiny natural traces exist, but it is not an ordinary mined material.",
      "Np-237 supports specialized nuclear and chemical research. Its electrons and radioactive nucleus are studied for different reasons. Trace natural occurrence does not imply a common natural isotope mixture."
    ]
  },
  {
    "z": 94,
    "name": "Plutonium",
    "symbol": "Pu",
    "mass": 244,
    "f": 6,
    "d": 0,
    "ids": [
      238,
      239,
      240,
      244
    ],
    "words": [
      "Plutonium (Pu) is a heavy, radioactive metal. One kind helps power spacecraft far from the Sun.",
      "Plutonium is element 94, a radioactive actinide with seven electron shells. Most is produced in reactors, with only extremely small natural traces. Pu-238 provides heat for some spacecraft power systems.",
      "Plutonium has [Rn] 5f⁶ 7s², with no occupied 6d state. Pu-238 supplies decay heat for spacecraft, while fissile Pu-239 has nuclear-energy and weapons-history significance. Pu-244 has a much longer half-life, but all plutonium isotopes remain radioactive. Its several oxidation states—electron-accounting charges used to describe bonding—contribute to unusual chemistry. The displayed atom is simplified."
    ],
    "contextWords": [
      "Some spacecraft turn heat from plutonium-238 into electricity.",
      "NASA spacecraft can use heat released by Pu-238 as it decays. This power system does not use a fission chain reaction.",
      "Radioisotope power systems convert Pu-238 decay heat into electricity for spacecraft instruments. This differs from energy released in a fission chain reaction. Pu-239 has nuclear-energy uses and weapons-history relevance; no design or production processes are modeled."
    ]
  },
  {
    "z": 95,
    "name": "Americium",
    "symbol": "Am",
    "mass": 243,
    "f": 7,
    "d": 0,
    "ids": [
      241,
      243
    ],
    "words": [
      "Americium (Am) is a heavy, radioactive metal. A tiny enclosed amount helps some smoke alarms work.",
      "Americium is element 95, a radioactive actinide with seven electron shells. It is mainly produced in reactors, rather than mined. Tiny sealed Am-241 sources help many ionization smoke detectors sense smoke.",
      "Americium has [Rn] 5f⁷ 7s², with no occupied 6d state. Am-241 is used in tiny sealed sources in many ionization smoke detectors. Am-243 lasts longer before decay, but both isotopes are radioactive. Americium is primarily produced in nuclear reactors. The displayed atom is simplified."
    ],
    "contextWords": [
      "Leave smoke alarms intact. Never open or remove the enclosed radioactive source.",
      "Many ionization smoke detectors use a tiny sealed Am-241 source to help sense smoke. Never open, remove or experiment with the source.",
      "Am-241 sources support ionization smoke detectors and specialized industrial gauges. The source remains enclosed during normal use. Never dismantle the radioactive source, remove it or experiment with it."
    ]
  },
  {
    "z": 96,
    "name": "Curium",
    "symbol": "Cm",
    "mass": 247,
    "f": 7,
    "d": 1,
    "p": 0,
    "ids": [
      244,
      247
    ],
    "words": [
      "Curium (Cm) is a human-made, radioactive element. It is named for Marie and Pierre Curie.",
      "Curium is element 96, a radioactive actinide made mainly for specialized uses. Tiny amounts help scientists study materials and planetary rocks. Its radioactive changes also release heat.",
      "Curium has [Rn] 5f⁷ 6d¹ 7s², keeping the 6d electron beside a half-filled 5f group. Cm-247 lasts much longer than Cm-244, but both are radioactive. Cm-244 supports specialized instruments, including planetary-science research. Curium is named for Marie and Pierre Curie. This atom is a simplified model."
    ],
    "contextWords": [
      "Special instruments containing curium have helped scientists study rocks on Mars.",
      "Cm-244 has been used in instruments that measure which elements are in planetary rocks. Radioactive decay also releases heat.",
      "Cm-244 sources have supported alpha-particle X-ray instruments in planetary research. These instruments analyze a material through the radiation it sends back. Radioactive decay releases heat, but that does not make curium an ordinary energy material."
    ]
  },
  {
    "z": 97,
    "name": "Berkelium",
    "symbol": "Bk",
    "mass": 247,
    "f": 9,
    "d": 0,
    "p": 0,
    "ids": [
      247,
      249
    ],
    "words": [
      "Berkelium (Bk) is a human-made, radioactive element. Its name comes from Berkeley, California.",
      "Berkelium is element 97, a radioactive actinide produced in extremely small amounts. Bk-249 helps scientists investigate still-heavier elements. It has no large-scale everyday use.",
      "Berkelium has [Rn] 5f⁹ 7s², with no occupied 6d state. Its nine 5f electrons place it beyond the half-filled group. Bk-249 supports research on heavier elements, while Bk-247 lasts much longer before decay. Tiny supplies limit uses mainly to research. This atom is a simplified model."
    ],
    "contextWords": [
      "Berkelium helps scientists learn about even heavier atoms.",
      "Bk-249 has contributed to research that identified heavier elements. This work uses very small amounts in specialized laboratories.",
      "Bk-249 has been useful in research leading to heavier elements. Bk-247 provides a longer-lived comparison for nuclear studies. Neither isotope has an ordinary large-scale commercial role."
    ]
  },
  {
    "z": 98,
    "name": "Californium",
    "symbol": "Cf",
    "mass": 251,
    "f": 10,
    "d": 0,
    "p": 0,
    "ids": [
      249,
      251,
      252
    ],
    "words": [
      "Californium (Cf) is a human-made, radioactive element. It is named after California.",
      "Californium is element 98, a radioactive actinide produced in tiny quantities. Cf-252 releases neutrons, particles found in atomic nuclei. Sealed sources have specialized industrial and research uses.",
      "Californium has [Rn] 5f¹⁰ 7s². Cf-252 is a strong neutron emitter because some of its nuclei split spontaneously. Sealed sources support specialized research, industry and reactor startup. Cf-249 and Cf-251 last longer before decay, but all are radioactive. This atom is a simplified model."
    ],
    "contextWords": [
      "Californium helps specialists examine materials using special scientific instruments.",
      "Cf-252 releases neutrons when some nuclei split. Sealed sources support materials research, specialized industrial measurements and reactor startup.",
      "Cf-252 mainly undergoes alpha decay, but its spontaneous-fission branch releases neutrons. Sealed sources serve specialized measurements, research and reactor startup. The explorer does not model a source, a reactor or real handling."
    ]
  },
  {
    "z": 99,
    "name": "Einsteinium",
    "symbol": "Es",
    "mass": 252,
    "f": 11,
    "d": 0,
    "p": 0,
    "ids": [
      252
    ],
    "words": [
      "Einsteinium (Es) is a human-made, radioactive element. It is named after Albert Einstein.",
      "Einsteinium is element 99, a radioactive actinide produced in tiny amounts for research. It was identified in material from the first thermonuclear-device test. Its limited supply makes many properties hard to measure.",
      "Einsteinium has [Rn] 5f¹¹ 7s². Es-252 is radioactive and has a half-life of about 1.3 years. The element was identified in material associated with the first thermonuclear-device test. Tiny research samples and decay make many bulk properties difficult to measure. This atom is a simplified model."
    ],
    "contextWords": [
      "Scientists use very small amounts of einsteinium to study heavy atoms.",
      "Einsteinium is named after Albert Einstein and has no ordinary commercial use. Modern studies use tiny research samples.",
      "Einsteinium was identified after the first thermonuclear-device test in 1952. Today it supports specialized nuclear and chemical research. This historical connection is not a description of a device or its operation."
    ]
  },
  {
    "z": 100,
    "name": "Fermium",
    "symbol": "Fm",
    "mass": 257,
    "f": 12,
    "d": 0,
    "p": 0,
    "ids": [
      257
    ],
    "words": [
      "Fermium (Fm) is a human-made, radioactive element. It is named after the scientist Enrico Fermi.",
      "Fermium is element 100, a radioactive actinide made in extremely small quantities. It was first identified in debris from the first thermonuclear-device test. It has no ordinary commercial use.",
      "Fermium has [Rn] 5f¹² 7s². Fm-257 is radioactive and lasts about 100 days before half of a large sample decays. Fermium was first identified in thermonuclear-test debris. No macroscopic sample has been produced, so many bulk properties remain unknown or predicted. This atom is a simplified model."
    ],
    "contextWords": [
      "Fermium helps scientists study atoms that are hard to make and short-lived.",
      "Fermium honors Enrico Fermi. Researchers work with extremely small amounts, not ordinary visible samples.",
      "Fm-257 supports studies of very heavy nuclei and their radioactive changes. Fermium has no ordinary commercial use. Measurements on small numbers of atoms do not establish every bulk property."
    ]
  },
  {
    "z": 101,
    "name": "Mendelevium",
    "symbol": "Md",
    "mass": 258,
    "f": 13,
    "d": 0,
    "p": 0,
    "ids": [
      258
    ],
    "words": [
      "Mendelevium (Md) is a human-made, radioactive element. Its discovery showed that scientists could identify new atoms one at a time.",
      "Mendelevium is element 101, a radioactive actinide named for Dmitri Mendeleev. It was among the first elements produced and identified one atom at a time. Only extremely small amounts are available for research.",
      "Mendelevium has [Rn] 5f¹³ 7s², leaving one vacancy in the 5f group. Md-258 is radioactive, with a half-life of about 52 days. Its discovery helped establish methods for identifying elements one atom at a time. Limited experiments and calculations provide much of what is known about its properties. This atom is a simplified model."
    ],
    "contextWords": [
      "Dmitri Mendeleev helped develop the periodic table. Mendelevium was named in his honor.",
      "Mendelevium was identified using only a small number of atoms. It is used for scientific research rather than everyday products.",
      "The discovery of mendelevium was an important demonstration of identifying an element one atom at a time. Md-258 supports studies of radioactive nuclei. Research supplies remain far too small for ordinary material samples."
    ]
  },
  {
    "z": 102,
    "name": "Nobelium",
    "symbol": "No",
    "mass": 259,
    "f": 14,
    "d": 0,
    "p": 0,
    "ids": [
      259
    ],
    "words": [
      "Nobelium (No) is a human-made, radioactive element. It is named after Alfred Nobel.",
      "Nobelium is element 102, a radioactive actinide studied using very small numbers of atoms. No-259 has a half-life of about an hour. Its limited supply makes experiments difficult.",
      "Nobelium has [Rn] 5f¹⁴ 7s², completing the 5f subshell. No-259 is radioactive and has a half-life of about an hour. Researchers study it using only tiny numbers of atoms. Many properties rely on limited experiments and advanced calculations. This atom is a simplified model."
    ],
    "contextWords": [
      "Scientists study small numbers of nobelium atoms in special laboratories.",
      "Nobelium is named after Alfred Nobel and has no ordinary commercial use. Its short-lived atoms are difficult to study.",
      "Nobelium completes the 5f group in the listed neutral ground state. Chemical experiments on small numbers of atoms help test theories of very heavy elements. A filled electron group does not make its nucleus nonradioactive."
    ]
  },
  {
    "z": 103,
    "name": "Lawrencium",
    "symbol": "Lr",
    "mass": 266,
    "f": 14,
    "d": 0,
    "p": 1,
    "ids": [
      262,
      266
    ],
    "words": [
      "Lawrencium (Lr) is a human-made, radioactive element. It is the last member of the actinide row.",
      "Lawrencium is element 103, a radioactive actinide named after Ernest Lawrence. Researchers study very small numbers of atoms. It completes the actinide row and leads toward the heavier elements.",
      "Lawrencium uses [Rn] 5f¹⁴ 7s² 7p¹, with three electrons in shell 7. Older textbooks predicted a 6d electron; modern calculations and measurements support the 7p arrangement. Lr-266 is longer-lived than Lr-262, but its assignment and half-life carry substantial uncertainty. Only tiny numbers of atoms are available, so many properties remain poorly known. This atom is a simplified model."
    ],
    "contextWords": [
      "Lawrencium is named for Ernest Lawrence, an inventor of important scientific equipment.",
      "Lawrencium helps scientists test ideas about very heavy atoms. It is studied only in tiny quantities and has no everyday commercial use.",
      "Calculations predict a 7p ground-state electron instead of the older expected 6d electron. Measured ionization energy agrees with these calculations, but it does not directly identify the configuration by itself. Lawrencium provides a bridge from actinide research toward still-heavier elements."
    ]
  }
];
 const detail=Object.fromEntries([["Ac-225", 9.92, "days", "About 10 days", "francium-221", "Produced for specialized medical research", null, "Ac-225 is studied and used in specialized targeted alpha therapies. This work aims radiation at selected cancer cells in controlled medical settings."], ["Ac-227", 21.772, "years", "About 22 years", "thorium-227", "Natural decay-product traces in the uranium-235 chain", null, "Ac-227 is the longest-lived naturally occurring actinium isotope. It serves as the representative isotope and supports natural-decay research."], ["Th-228", 1.9116, "years", "About 1.9 years", "radium-224", "Natural decay-product traces in the thorium-232 chain", null, "Th-228 is a short-lived part of the natural thorium-232 decay chain. Its abundance depends on local production and decay."], ["Th-230", 75380, "years", "About 75,000 years", "radium-226", "Natural decay product in the uranium-238 chain", [0.02, 0.02], "Th-230 helps scientists study the ages of suitable Earth materials. It is continually supplied by natural radioactive changes."], ["Th-232", 14050000000.0, "years", "About 14 billion years", "radium-228", "Primordial natural isotope", [99.98, 0.02], "Th-232 is the dominant natural thorium isotope and has survived since Earth formed. It is studied as a possible nuclear-energy resource. A long half-life does not make it nonradioactive or harmless."], ["Pa-231", 32760, "years", "About 33,000 years", "actinium-227", "Natural decay product in the uranium-235 chain", [100, 0], "Pa-231 is the longest-lived naturally occurring protactinium isotope. It supports studies of natural radioactive changes and Earth materials."], ["U-234", 245500, "years", "About 246,000 years", "thorium-230", "Natural decay product in the uranium-238 chain", [0.0054, 0.0005], "U-234 is a small part of natural uranium. Its nuclear properties differ from U-235 and U-238, despite the same neutral electron arrangement."], ["U-235", 704000000.0, "years", "About 704 million years", "thorium-231", "Primordial natural isotope", [0.7204, 0.0006], "U-235 is naturally occurring and fissile: it can sustain a fission chain reaction with appropriate neutrons. This makes it important in nuclear energy."], ["U-238", 4468000000.0, "years", "About 4.47 billion years", "thorium-234", "Primordial natural isotope", [99.2742, 0.001], "U-238 is the dominant natural uranium isotope. It is fertile, meaning nuclear reactions can change it into a fissile isotope."], ["Np-237", 2144000.0, "years", "About 2.14 million years", "protactinium-233", "Primarily produced; extremely small natural traces", null, "Np-237 is the representative neptunium isotope. It supports specialized nuclear research rather than ordinary material uses."], ["Pu-238", 87.7, "years", "About 88 years", "uranium-234", "Produced for specialized applications", null, "Pu-238 supplies decay heat in radioisotope power systems for spacecraft. These systems turn heat into electricity without a fission chain reaction."], ["Pu-239", 24110, "years", "About 24,000 years", "uranium-235", "Primarily produced; extremely small natural traces", null, "Pu-239 is fissile: it can sustain a fission chain reaction with appropriate neutrons. It has nuclear-energy uses and weapons-history relevance."], ["Pu-240", 6561, "years", "About 6,600 years", "uranium-236", "Produced through nuclear reactions", null, "Pu-240 helps researchers compare the nuclear properties of plutonium isotopes. It is primarily an alpha emitter, with a small spontaneous-fission branch."], ["Pu-244", 81300000.0, "years", "About 81 million years", "uranium-240", "Produced in research; extremely small natural traces may occur", null, "Pu-244 has a much longer half-life than most plutonium isotopes. Extremely small natural traces help scientists study the formation of heavy elements in space. It is still radioactive."], ["Am-241", 432.6, "years", "About 433 years", "neptunium-237", "Produced through nuclear reactions", null, "Am-241 is used in tiny sealed sources in many ionization smoke detectors. Never open or remove a radioactive source."], ["Am-243", 7364, "years", "About 7,400 years", "neptunium-239", "Produced through nuclear reactions", null, "Am-243 has a longer half-life than Am-241. It is mainly a research isotope, and a longer half-life does not mean harmlessness."]].map(([id,value,unit,display,daughter,origin,abundance,significance])=>[id,{half:[value,unit,display],daughter,origin,abundance,significance}]));
 Object.assign(detail,Object.fromEntries([
  [
    "Cm-244",
    18.11,
    "years",
    "About 18 years",
    [
      "Alpha (α) decay to plutonium-240"
    ],
    "Cm-244 is used in specialized scientific instruments, including planetary rock analysis. Its radioactive decay also produces heat."
  ],
  [
    "Cm-247",
    15600000.0,
    "years",
    "About 16 million years",
    [
      "Alpha (α) decay to plutonium-243"
    ],
    "Cm-247 has a much longer half-life than Cm-244. It supports nuclear and isotope research, but a long half-life does not make it safe to handle."
  ],
  [
    "Bk-247",
    1380,
    "years",
    "About 1,400 years",
    [
      "Alpha (α) decay to americium-243"
    ],
    "Bk-247 is a longer-lived research isotope. Its half-life is uncertain by roughly 250 years."
  ],
  [
    "Bk-249",
    327.2,
    "days",
    "About 327 days",
    [
      "Mainly beta-minus (β−) decay to californium-249"
    ],
    "Bk-249 has supported research leading to heavier elements. It has no ordinary large-scale commercial use."
  ],
  [
    "Cf-249",
    351,
    "years",
    "About 350 years",
    [
      "Alpha (α) decay to curium-245"
    ],
    "Cf-249 supports research on very heavy nuclei. It lasts much longer before decay than Cf-252."
  ],
  [
    "Cf-251",
    898,
    "years",
    "About 900 years",
    [
      "Alpha (α) decay to curium-247"
    ],
    "Cf-251 is the representative californium isotope used here. It is much longer-lived than Cf-252, but it remains radioactive."
  ],
  [
    "Cf-252",
    2.645,
    "years",
    "About 2.65 years",
    [
      "Mainly alpha (α) decay to curium-248",
      "Spontaneous-fission branch releases neutrons"
    ],
    "Cf-252 is a strong neutron emitter because a small fraction of its nuclei split spontaneously. Sealed sources support specialized industry, research and reactor startup."
  ],
  [
    "Es-252",
    471.7,
    "days",
    "About 1.3 years",
    [
      "Mainly alpha (α) decay to berkelium-248",
      "Electron capture to californium-252"
    ],
    "Es-252 is a research isotope with no ordinary commercial application. Small supplies and radioactive decay limit experiments on the element."
  ],
  [
    "Fm-257",
    100.5,
    "days",
    "About 100 days",
    [
      "Mainly alpha (α) decay to californium-253",
      "Small spontaneous-fission branch"
    ],
    "Fm-257 is studied in nuclear research. Only extremely small amounts are available, so ordinary visible samples cannot be examined."
  ],
  [
    "Md-258",
    51.59,
    "days",
    "About 52 days",
    [
      "Alpha (α) decay to einsteinium-254"
    ],
    "Md-258 is a research isotope studied in extremely small amounts. It is not the shorter-lived nuclear isomer, a different energy state of the same isotope."
  ],
  [
    "No-259",
    58,
    "minutes",
    "About 1 hour",
    [
      "Mainly alpha (α) decay to fermium-255",
      "Electron capture / positron emission to mendelevium-259"
    ],
    "No-259 is studied using small numbers of atoms. Its approximately hour-long half-life limits how long an experiment can follow a group of atoms."
  ],
  [
    "Lr-262",
    4,
    "hours",
    "About 4 hours (approximate)",
    [
      "Electron capture / positron emission to nobelium-262; branching uncertain",
      "Spontaneous-fission branch below 10%"
    ],
    "Lr-262 is the representative isotope in the project’s periodic-table convention. Its half-life is approximate, and the sizes of its decay branches are not well known. Alpha decay has not been observed."
  ],
  [
    "Lr-266",
    11,
    "hours",
    "About 11 hours (very uncertain)",
    [
      "Spontaneous fission (tentative assignment)"
    ],
    "The tentative Lr-266 assignment has a reported half-life of 11 hours, with an uncertainty of +21/−5 hours. It lasts longer than Lr-262 but is still short-lived on everyday timescales. The estimate comes from very few observed events."
  ]
].map(([id,value,unit,display,modes,significance])=>[id,{half:[value,unit,display],modes,origin:'Produced for specialized research or applications',abundance:null,significance}])));
 const simpleSignificance={
  "Ac-225": "Scientists study this kind of actinium for special cancer treatments.",
  "Ac-227": "This kind of actinium changes more slowly than other kinds found in nature.",
  "Th-228": "This kind of thorium forms naturally and changes in a few years.",
  "Th-230": "This kind of thorium helps scientists study the ages of rocks.",
  "Th-232": "Most natural thorium is this kind. It changes very slowly but is still radioactive.",
  "Pa-231": "This rare kind of protactinium helps scientists study Earth materials.",
  "U-234": "This is a very small part of natural uranium.",
  "U-235": "This kind of uranium helps provide energy in nuclear power plants.",
  "U-238": "Most natural uranium is this kind.",
  "Np-237": "Scientists study this kind of neptunium in specialized facilities.",
  "Pu-238": "Some spacecraft turn heat from this kind of plutonium into electricity.",
  "Pu-239": "This kind of plutonium has been important in nuclear energy and history.",
  "Pu-240": "Scientists compare this kind of plutonium with other kinds.",
  "Pu-244": "This kind of plutonium changes very slowly. It helps scientists study heavy atoms from space.",
  "Am-241": "Tiny sealed amounts help some smoke detectors work. Never open or remove the radioactive source.",
  "Am-243": "This kind of americium lasts longer than americium-241. It is still radioactive."
};
 Object.assign(simpleSignificance,{
  "Cm-244": "This kind of curium helps special instruments study rocks.",
  "Cm-247": "This kind of curium changes much more slowly than curium-244.",
  "Bk-247": "Scientists study this kind of berkelium in special laboratories.",
  "Bk-249": "This kind of berkelium has helped scientists investigate heavier atoms.",
  "Cf-249": "Scientists use this kind of californium for research.",
  "Cf-251": "This kind of californium changes more slowly than californium-252.",
  "Cf-252": "This kind of californium helps specialists examine materials.",
  "Es-252": "Scientists study tiny amounts of this kind of einsteinium.",
  "Fm-257": "Scientists can study only extremely small amounts of this kind of fermium.",
  "Md-258": "This kind of mendelevium helps scientists learn about heavy atoms.",
  "No-259": "This kind of nobelium changes fairly quickly.",
  "Lr-262": "This kind of lawrencium changes in a few hours.",
  "Lr-266": "Only a few changes from this kind of lawrencium have been seen. Scientists are unsure exactly how quickly a large group would change."
});
 const progression=L('These heavy elements start the actinide row. Their inside electron groups do not fill in one simple order.','All seven atoms have two electrons in shell 7. The nearby 5f and 6d groups also matter for bonding. Their filling pattern changes across the row.','Beyond the radon core: Ac 6d¹ 7s²; Th 6d² 7s²; Pa 5f² 6d¹ 7s²; U 5f³ 6d¹ 7s²; Np 5f⁴ 6d¹ 7s²; Pu 5f⁶ 7s²; Am 5f⁷ 7s². The 5f, 6d and 7s states are close in energy. Ground states therefore do not follow a simple “add one 5f electron” rule. Their electrons can all influence chemical behavior.');
 const safety=L('Every kind of this element is radioactive. Only trained specialists work with these materials.','All isotopes of this element are radioactive. Professional work needs specialized equipment, training, shielding and regulation.','All isotopes of this element are radioactive. These materials are studied or used only with specialized equipment, training, shielding and regulation. Natural occurrence and long half-life do not mean harmlessness.');
 const lateProgression=L('These elements finish the actinide row. Their inside electron group fills up toward the end.','The 5f group fills across these elements, but the pattern has exceptions. Curium also has a 6d electron, and lawrencium adds a 7p electron.','Beyond [Rn]: Am 5f⁷ 7s²; Cm 5f⁷ 6d¹ 7s²; Bk 5f⁹ 7s²; Cf 5f¹⁰ 7s²; Es 5f¹¹ 7s²; Fm 5f¹² 7s²; Md 5f¹³ 7s²; No 5f¹⁴ 7s²; Lr 5f¹⁴ 7s² 7p¹. The 5f, 6d, 7s and 7p states can lie close in energy. A simple filling diagram does not always predict the ground state correctly.');
 const lateSafety=L('All kinds of this element are radioactive. Only trained specialists study or use these materials.','All known isotopes are radioactive. This element is produced and studied in specialized facilities with trained staff and regulated equipment.','All known isotopes of this element are radioactive. It is produced and studied only in specialized facilities with trained personnel and regulated equipment. A longer half-life does not mean safe to handle.');
 const limits=L('Scientists have only tiny amounts to study. Many properties are still hard to find out.','Only tiny quantities are available, and some atoms decay quickly. Ordinary samples are not available for routine tests of appearance or other material properties.','Scientists may study only a few atoms at a time, and decay can quickly reduce the supply. Experiments and advanced calculations provide partial knowledge. Bulk properties such as density, melting point, color and structure may be unknown or predicted; this atom picture does not depict a material sample.');
 const configurationLimits=L('Scientists use careful measurements and calculations to study these heavy atoms.','Some electron arrangements depend partly on calculations because experiments are difficult.','These ground-state configurations draw on experiments and advanced calculations. Limited evidence makes some assignments less directly established than those of lighter atoms.');
 const core=C.elements[86].neutralSubshells; // The complete, occupied 86-electron radon core.
 for(const row of rows){const {z,name,symbol,mass,f,d,ids,p=0}=row,late=z>=96,slug=name.toLowerCase(),subs=[...core,...(f?[{id:'5f',n:5,l:'f',occupancy:f}]:[]),...(d?[{id:'6d',n:6,l:'d',occupancy:d}]:[]),{id:'7s',n:7,l:'s',occupancy:2},...(p?[{id:'7p',n:7,l:'p',occupancy:p}]:[])],shells=[2,8,18,32,18+f,8+d,2+p],important=subs.slice(core.length).map(s=>s.id),keys=late?['lateAtomic','lateNuclear','act'+symbol+'Uses',...(z===96?['lateCmUse']:z===98?['lateCfUse']:z===103?['lateLr262','lateLr266','lateLrAtom']:z>=99?['lateHistory']:[])]:['actAtomic','actAbundance','actDecay','act'+symbol+'Uses',...(z===89?['actAc225','actTherapy']:z===94?['actPu244','actSpace','actCosmic']:z===95?['actAm241','actAm243','actSmoke']:[]),...([90,92,94].includes(z)?['actFissile','actFertile']:[])];
 source('act'+symbol+'Uses','Royal Society of Chemistry',name+': properties and uses','https://periodic-table.rsc.org/element/'+z+'/'+slug,'Element family, occurrence, history and applications. Nuclear lifetimes and fractions use separate evaluated references.');
 const outer=late?L('This electron belongs to an outside group. Nearby groups can also help atoms join together.',(p?'Lawrencium has two 7s electrons and one 7p electron in shell 7.':'Two 7s electrons occupy shell 7.')+' Other nearby electron groups can also affect bonding.','This electron is in an outer occupied state. Nearby 5f, 6d, 7s and sometimes 7p states can influence late-actinide chemistry. Shell count alone does not explain bonding.'):L('This electron belongs to the outside group. Nearby electron groups can also help atoms join together.','Two 7s electrons occupy the outside shell. Nearby 5f and 6d electrons, when present, can also affect bonding.','This electron is in an outer occupied state. In actinides, occupied 5f, 6d and 7s states can all influence chemical behavior. The shell-7 count alone does not explain bonding.'),inner=L('An electron has negative charge and very little mass. It is found around the nucleus.','This electron is in an allowed state around the nucleus. Its mass is extremely small compared with a proton.','This electron occupies an allowed quantum state around the nucleus. Its mass is about 1/1836 the mass of a proton. Nearby 5f and 6d states can affect bonding even though they are below shell 7.');
 const weighted=(late||[89,93,94,95].includes(z))?L('The number in brackets names one version of this atom. It is not an average.','The bracketed number is the proton-plus-neutron count of a representative isotope. It is not an average mass.','No standard atomic weight is assigned here. Brackets identify a representative isotope by its mass number, not a weighted average.'):L('Atomic weight describes natural material. Mass number counts protons and neutrons in one atom.','Atomic weight uses measured isotope masses and their natural proportions. It is different from a whole-number mass number.','Standard atomic weight describes terrestrial material using measured isotope masses and proportions. A natural radioactive element can still have a standard atomic weight.');
 elements[z]={atomicNumber:z,name,symbol,defaultIsotope:slug+'-'+mass,availableIsotopes:ids.map(m=>slug+'-'+m),neutralElectronCount:z,neutralShells:shells,neutralSubshells:subs,neutralConfiguration:C.fullConfiguration(subs),fullConfiguration:C.fullConfiguration(subs),shorthandConfiguration:'[Rn] '+C.fullConfiguration(subs.slice(core.length)),actinideExplorer:true,...(late?{lateActinideExplorer:true,configurationNote:configurationLimits}:{}),modelNotice:L('This picture simplifies a large atom. The electron counts are correct, but sizes are not to scale.','This complex atom is simplified to make its main structure clear. Electron counts and configurations are accurate, but this is not a literal picture or a scale model.','This visualization simplifies a very complex atom so its main structure is easier to understand. Electron totals and configurations are accurate, but the drawing is not a literal picture or a scale model.'),exactHeavyParticles:true,groupedCoreElectronCount:86,fullDetail:false,waveResolution:'subshell',conciseOverview:true,noStableIsotopes:true,descriptions:L(...row.words),context:{title:'Science and Electrical Engineering',descriptions:Object.fromEntries(['elementary','middle','high'].map((l,i)=>[l,row.contextWords[i]+(z>=99?' '+limits[l]:'')+' '+(late?lateSafety:safety)[l]]))},valence:{shells:[7],importantSubshells:important,descriptions:outer,studentNote:outer.high},sources:keys,isotopeSourceKeys:keys,periodProgressionTitle:late?'Completing the Actinides':'Across the Early Actinides',periodProgression:late?lateProgression:progression,isotopeGuideKeys:['isotope','radioactive','abundance','halfLife','decay','weighted','cosmic'],isotopeEducation:{weighted,isotope:L('These are versions of '+slug+' with different neutron counts.','Every '+slug+' isotope has '+z+' protons. Changing neutrons changes the mass number.','A neutral '+slug+' isotope retains '+z+' electrons. Chemical reactions involve electrons; nuclear reactions change the nucleus.'),abundance:L('Some kinds occur in nature. Others are mainly made for special uses.','Percentages describe natural Earth materials when a useful mixture is known. Tiny traces and produced isotopes have no fixed natural percentage here.','CIAAW fractions describe representative terrestrial materials. Local production and radioactive decay can change mixtures; trace or produced isotopes are not assigned invented percentages.'),cosmic:L('The kinds found on Earth are not the same everywhere in space.','Earth materials and other places in space can have different mixtures.','Primordial isotopes have survived since Earth formed. Other natural isotopes are supplied by later nuclear changes. Terrestrial proportions are not universal.'),radioactive:L('A radioactive nucleus can change and release radiation.','Radioactive means the nucleus can change on its own and release radiation. Natural does not mean safe.','Radioactive means an unstable nucleus changes over time and releases radiation. Fissile means capable of sustaining a fission chain reaction with appropriate neutrons. Fertile means able to become a fissile isotope through nuclear reactions.'),halfLife:L('Half-life is the time for about half of a large group of radioactive atoms to change.','Half-life describes a large group of radioactive atoms. It does not tell us exactly when one individual atom will decay.','Half-life describes the behavior of a large group of radioactive atoms. It does not predict when one individual atom will decay. A long half-life does not make an isotope harmless.'),decay:L('A radioactive nucleus can change into another kind of nucleus.','Alpha decay releases two protons and two neutrons together. In beta-minus decay, a neutron changes into a proton and releases an electron and an antineutrino, a very light particle.','Radioactive decay is a spontaneous nuclear change. Fission is the splitting of a heavy nucleus; it may be spontaneous or triggered by a nuclear interaction. Not every radioactive isotope readily sustains a fission chain reaction. This explorer does not animate decay.')},education:{concepts:{'valence-electron':outer,'inner-electron':inner},regions:{waveValence:outer,orbitalValence:outer,waveInner:inner,orbitalInner:inner},models:{bohr:L(name+' has '+z+' electrons in seven counting shells. The circles are not real tracks.','Seven shells contain '+shells.join(', ')+' electrons. These paths are a historical counting model, not literal electron orbits.','This visualization simplifies a very complex atom so its main structure is easier to understand. Electron totals and configurations are accurate, but the drawing is not a literal picture or a scale model.'),wave:L('Electrons have wave-like behavior. These bands show simplified allowed patterns.','Only certain electron states are allowed. Heavy atoms have many interacting states, so these waves are conceptual.','The view shows one conceptual pattern per occupied subshell, emphasizing '+important.join(', ')+'. It does not calculate a complete many-electron wavefunction in real time.'),quantum:L('The cloud shows where electrons are likely to be found. It is not a solid surface.','Overview groups 86 inner electrons and highlights '+important.join(', ')+'. Clouds summarize likely electron locations, not hard surfaces.','Overview groups the 86-electron radon core and emphasizes '+C.fullConfiguration(subs.slice(core.length))+'. Explore Subshells inspects each occupied state. The clouds summarize where electrons are likely to be detected; they are not rigid objects.')}}};
 if(late){elements[z].isotopeEducation.abundance=L('These kinds of atoms are made for special studies.','These isotopes are produced for specialized studies or applications. No ordinary natural percentage is assigned.','No characteristic natural terrestrial mixture is assigned to these produced isotopes. Bracketed mass numbers are not abundance-weighted atomic weights.');elements[z].isotopeEducation.cosmic=L('Scientists make the atoms shown here for special studies.','These records describe atoms produced for scientific study.','The isotopes selected here are studied as produced materials. No cosmic abundance or natural terrestrial proportion is inferred.');elements[z].isotopeEducation.radioactive=L('A radioactive nucleus can change and release radiation.','A radioactive nucleus changes on its own and releases radiation. A long half-life does not mean safe handling.','Radioactive decay is a spontaneous change in an unstable nucleus. The lifetime of one atom cannot be predicted from the half-life of a large group.');elements[z].isotopeEducation.decay=L('A nucleus can change and release particles or energy.','Alpha decay releases two protons and two neutrons together. Spontaneous fission splits a heavy nucleus and can release neutrons.','Alpha decay emits two protons and two neutrons together. Beta-minus decay changes a neutron into a proton; electron capture or positron emission changes a proton into a neutron. Spontaneous fission splits a heavy nucleus. The listed branches are a concise summary, not a decay simulation.');}
 for(const m of ids){const id=slug+'-'+m,v=detail[symbol+'-'+m],a=v.abundance,natural=/natural|Primordial/i.test(v.origin),descriptions=L(name+'-'+m+' has '+z+' protons and '+(m-z)+' neutrons. It is radioactive.',name+'-'+m+' has '+(m-z)+' neutrons. Its nucleus changes through radioactive decay.',name+'-'+m+' contains '+z+' protons and '+(m-z)+' neutrons. It is radioactive, regardless of its origin or half-life.'),uses=L(simpleSignificance[symbol+'-'+m],v.significance,v.significance),modes=v.modes||(symbol==='Ac'&&m===227?['Mainly beta-minus (β−) decay to thorium-227','Small alpha (α) branch to francium-223']:['Alpha (α) decay to '+v.daughter,...(symbol==='Pu'&&[240,244].includes(m)?['Small spontaneous-fission branch']:[])]);
 if(late)for(const level of ['elementary','middle','high'])uses[level]+=' This radioactive isotope is studied or used only in specialized facilities.';
 const originDescriptions=v.origin.startsWith('Primordial')?L('Found in nature. Some of these atoms have lasted since Earth formed.','This isotope has survived in nature since Earth formed.','Primordial natural isotope: it has survived since Earth formed.'):v.origin.startsWith('Natural')?L('Forms in nature when other radioactive atoms change.','This isotope forms in a natural sequence of radioactive changes.',v.origin+'.'):natural?L('Mostly made for special uses. Extremely tiny amounts can occur in nature.','Mostly produced for specialized uses, with extremely small natural traces.',v.origin+'.'):L('Made for special uses or research.','Produced through nuclear reactions for specialized uses or research.',v.origin+'.');
 const abundanceTextByLevel=Object.fromEntries(['elementary','middle','high'].map(level=>[level,originDescriptions[level]+' '+(a?(level==='elementary'?'Amount in natural material: ':level==='middle'?'Representative amount in natural Earth material: ':'Representative terrestrial abundance: ')+a[0]+'%.':'No fixed natural percentage is assigned.')]));
 isotopes[id]={id,element:name,symbol,elementSymbol:symbol,atomicNumber:z,massNumber:m,protons:z,neutrons:m-z,neutralElectronCount:z,stable:false,stabilityClassification:late&&symbol==='Lr'&&m===266?'Radioactive · tentative assignment':'Radioactive',common:!!a,displayName:name+'-'+m,halfLife:{value:v.half[0],unit:v.half[1],display:v.half[2],...(symbol==='Lr'?(m===266?{uncertainty:{minus:5,plus:21,unit:'hours'},tentative:true}:{approximate:true}):{})},...(late?{safety:lateSafety.high,safetyDescriptions:lateSafety}:{}),decayModes:modes,primaryDecay:modes[0],naturalComponent:natural,naturalAbundance:a?{percent:a[0],uncertaintyPercentagePoints:a[1],scope:'CIAAW representative terrestrial composition'}:null,origin:v.origin,originDescriptions,abundanceTextByLevel,abundanceText:a?'Representative terrestrial abundance: '+a[0]+'%. Natural and radioactive.':v.origin+'. No fixed natural terrestrial percentage is assigned.',descriptions,note:descriptions.high,uses:uses.high,usesByLevel:uses,sources:keys};
 }
 }
 C.isotopeSources=C.deepFreeze({...C.isotopeSources,...sources});C.isotopes=C.deepFreeze({...C.isotopes,...isotopes});C.elements=C.deepFreeze({...C.elements,...elements});
 C.validateActinideData=(catalog=Object.fromEntries(Object.entries(elements).filter(([z])=>+z<96)),nuclides=C.isotopes)=>{const r=C.validatePeriod4Data(catalog,nuclides);for(const e of Object.values(catalog)){const j=e.atomicNumber-89,row=rows[j];if(!row||e.name!==row.name||e.symbol!==row.symbol){r.errors.push('Actinide identity');continue;}const f=[0,0,2,3,4,6,7][j],d=[1,2,1,1,1,0,0][j],expected=[...core,...(f?[{id:'5f',n:5,l:'f',occupancy:f}]:[]),...(d?[{id:'6d',n:6,l:'d',occupancy:d}]:[]),{id:'7s',n:7,l:'s',occupancy:2}];if(JSON.stringify(e.neutralSubshells)!==JSON.stringify(expected)||JSON.stringify(e.neutralShells)!==JSON.stringify([2,8,18,32,18+f,8+d,2]))r.errors.push(e.symbol+': explicit 5f/6d/7s ground state required');if(nuclides[e.defaultIsotope]?.massNumber!==[227,232,231,238,237,244,243][j])r.errors.push(e.symbol+': default isotope');for(const id of e.availableIsotopes)if(nuclides[id]?.stable!==false)r.errors.push(id+': radioactivity required');}r.ok=!r.errors.length;return r;};
 C.validateLateActinideData=(catalog=Object.fromEntries(Object.entries(elements).filter(([z])=>+z>=96)),nuclides=C.isotopes)=>{const r=C.validatePeriod4Data(catalog,nuclides),names=['Curium','Berkelium','Californium','Einsteinium','Fermium','Mendelevium','Nobelium','Lawrencium'],symbols=['Cm','Bk','Cf','Es','Fm','Md','No','Lr'],defaults=[247,247,251,252,257,258,259,266],fs=[7,9,10,11,12,13,14,14];for(const e of Object.values(catalog)){const j=e.atomicNumber-96;if(j<0||j>7||e.name!==names[j]||e.symbol!==symbols[j]){r.errors.push('Late-actinide identity');continue;}const f=fs[j],d=j===0?1:0,p=j===7?1:0,expected=[...core,{id:'5f',n:5,l:'f',occupancy:f},...(d?[{id:'6d',n:6,l:'d',occupancy:d}]:[]),{id:'7s',n:7,l:'s',occupancy:2},...(p?[{id:'7p',n:7,l:'p',occupancy:1}]:[])];if(JSON.stringify(e.neutralSubshells)!==JSON.stringify(expected)||JSON.stringify(e.neutralShells)!==JSON.stringify([2,8,18,32,18+f,8+d,2+p]))r.errors.push(e.symbol+': explicit late-actinide ground state required');if(nuclides[e.defaultIsotope]?.massNumber!==defaults[j])r.errors.push(e.symbol+': default isotope');for(const id of e.availableIsotopes){const i=nuclides[id];if(i?.stable!==false||!i.halfLife?.value||!i.origin||!i.safety||!i.decayModes?.length)r.errors.push(id+': radioactive isotope metadata required');if(i?.naturalAbundance)r.errors.push(id+': no assigned natural fraction');}}r.ok=!r.errors.length;return r;};
 C.lateActinideValidation=C.validateLateActinideData();if(!C.lateActinideValidation.ok)throw Error(C.lateActinideValidation.errors.join('; '));
 C.actinideValidation=C.validateActinideData();C.enabledValidation=C.validateEnabledData();if(!C.actinideValidation.ok||!C.enabledValidation.ok)throw Error([...C.actinideValidation.errors,...C.enabledValidation.errors].join('; '));
})(window.Copper);
