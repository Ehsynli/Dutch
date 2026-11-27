const readingTexts = [
  [
    ['Hallo, ik ben Noor', '‘Goedemorgen! Hoe gaat het?’ vraagt mevrouw Smit. ‘Goed, dank je. Mijn naam is Noor. Ik woon in Leiden en ik kom uit België. Ik ben getrouwd en ik heb een dochter. Ze heet Lina. Mijn broer woont ook in Nederland.’ Mevrouw Smit schrijft Noor op het bord. ‘Welke letters hoor je? In Noor hoor je een lange klank.’ Aan het eind zegt Noor: ‘Tot ziens!’'],
    ['Een kaart voor oma', 'Ik ben bij mijn oom. Mijn neef en mijn nicht zijn er ook. Mijn oom heeft een baby. Hij vraagt: ‘Wat schrijven we op de kaart voor oma?’ Mijn neef begint met ‘Hallo oma’. Ik schrijf een zin over ons huis. Mijn nicht schrijft het laatste woord en zet een punt. Samen lezen we de kaart.']
  ],
  [
    ['Op maandag naar school', 'Vandaag gaan twintig cursisten naar school. Buiten wacht Amir op zijn vriendin. Binnen leest hij een woord in zijn boek. De docent schrijft drie getallen op het bord. Amir kijkt in zijn agenda en vraagt: ‘Wanneer is de volgende les?’ De docent zegt: ‘Morgen.’ Amir vraagt: ‘Hoe schrijf je dat?’ De docent schrijft het langzaam op het bord.'],
    ['Een kruisje in de klas', 'In de klas maken we een opdracht. Op bladzijde tien staat een plaatje. Je moet het goede plaatje kiezen en een kruisje zetten. Sara heeft een vraag over de datum. ‘Is het de eerste of de laatste dag van de maand?’ Ik kijk in mijn agenda en help haar. In de pauze drinken we koffie. ‘Dank je wel voor je hulp!’ zegt Sara. ‘Graag gedaan!’ zeg ik.']
  ],
  [
    ['Mijn nieuwe flat', 'Ik woon in een flat met een klein balkon. Boven is de slaapkamer. Beneden zijn de gang en de woonkamer. In de woonkamer staat een groene bank. Naast de bank staat een blauwe kast. De buurvrouw komt langs. ‘Ik wil me graag voorstellen. Ik heet Eva,’ zegt ze. We drinken samen thee. Het is gezellig.'],
    ['Een sleutel op de derde verdieping', 'Ik wil een woning huren in deze buurt. Op internet zie ik een flat op de derde verdieping. Ik schrijf een bericht aan de verhuurder. Op zaterdag kan ik de flat zien. Bij de deur pakt hij zijn tas. ‘Mijn sleutel ligt nog thuis,’ zegt hij. De deur is op slot. Gelukkig woont hij dichtbij.']
  ],
  [
    ['Soep en brood aan tafel', 'Op zaterdag doen we boodschappen. Ik haal brood en boter bij de bakker. Thuis kook ik soep met aardappelen en een liter water. Mijn broer snijdt het brood. Als de soep klaar is, zet ik de borden en glazen op tafel. ‘Wil je ook een boterham met kaas?’ vraagt hij. ‘Ja, graag. Eet smakelijk!’'],
    ['Appeltaart na de markt', 'Ik ga naar de markt voor appels en een citroen. ‘Anders nog iets?’ vraagt de man. ‘Ja, ook een banaan, alstublieft.’ Daarna ga ik naar de supermarkt. Ik heb nog eieren nodig. De eieren zijn goedkoop. Ik betaal en krijg een bon. Thuis maak ik een appeltaart en verdeel ik de taart in kleine stukken.']
  ],
  [
    ['Een afspraak voor mijn knie', 'Mijn knie doet pijn. Ik bel de assistente voor een afspraak. ‘Kan ik eerder komen?’ vraag ik. ‘Ja, morgen om tien uur,’ zegt ze. Daarna zoek ik het woord knie op in het woordenboek. Eén knie is enkelvoud en twee knieën is meervoud. Ik oefen ook de woorden arm, been, neus en lip.'],
    ['Van de dokter naar de apotheek', 'Ik hoest en mijn keel doet pijn. De dokter vraagt naar mijn voornaam en achternaam. ‘U hebt griep. Drink genoeg water. Beterschap!’ zegt hij. Daarna haal ik bij de apotheek een doosje met medicijnen. De apotheker legt uit hoe ik ze moet innemen. Volgende week ga ik naar de tandarts. Die maakt een foto van mijn gebit.']
  ],
  [
    ['Welke jurk draag je?', 'Zaterdag is er een feest. Ik wil nieuwe kleding kopen. In de winkel zie ik een blauwe jurk en een groene bloes. ‘Welke jurk past bij deze schoenen?’ vraag ik. Mijn zus draagt een broek met een jas. Ze heeft ook een mooie armband om. Thuis zoeken we het lidwoord van jurk op. Het is de jurk.'],
    ['Een gat in mijn rok', 'Er zit een gat in mijn rok. Ik wil dezelfde rok bestellen. Ik bel de winkel. ‘Een ogenblik alstublieft,’ zegt de medewerker. De winkel is vanavond dicht, maar morgen kan ik langskomen. Thuis was ik mijn donkere kleren apart op dertig graden. Na een half uur hang ik ze op. Dan kunnen ze drogen.']
  ],
  [
    ['Op de fiets naar de boot', 'Ik ga met de fiets naar de boot. Op de kaart zie ik het eiland. Mijn tas zit achter op de fiets. Ik fiets op het fietspad en kijk naar de borden. Bij de boot wacht ik op mijn collega. Hij komt met de auto. Hij belt: ‘Ik sta in de file. Je mag alvast gaan.’'],
    ['Waar is onze halte?', 'Op donderdag ga ik om negen uur naar het station. Bij het kruispunt ga ik linksaf. Op het bord staat dat mijn trein om kwart over negen aankomt. Na de trein neem ik de bus. Ik vraag aan de chauffeur: ‘Waar is onze halte?’ Ik ken het woord halte nog niet goed en zoek de betekenis later op.']
  ],
  [
    ['Mijn nieuwe hobby', 'Op de boerderij van mijn oom zijn veel dieren. Ik zie een paard, een hond en een kat. Daarna ga ik met mijn vriendin naar de voetbalclub. Voetbal is haar hobby. Ze vindt bewegen gezond. Ik wil ook meedoen. Daarom vul ik een formulier in met mijn adres en e-mailadres. Thuis oefen ik de nieuwe woorden.'],
    ['Een weekend met vrienden', 'In het weekend ga ik met vrienden op vakantie. We zetten de tent op en wandelen in de natuur. Daarna fietsen we naar het strand. Bij een café zegt mijn vriend iets over een concert. Ik versta hem niet en vraag: ‘Kun je dat nog een keer langzaam zeggen?’ ’s Avonds gaan we uit eten. We hebben veel plezier.']
  ]
];
const readingExtensions = [
  [
    "Noor hoort iemand bij de deur. Een man zegt: ‘Goedemiddag, ik heet Jonas. Woon jij hier ook?’ Noor lacht en zegt dat ze met haar man en haar dochter in het huis naast hem woont. Jonas komt uit Nederland en woont al drie jaar in deze straat.",
    "Later komt de broer van Noor langs. Hij kent Jonas nog niet. ‘Hallo, mijn naam is Sam,’ zegt hij. Ze praten over hun familie. Sam vertelt dat zijn moeder en vader morgen komen. Noor vraagt of Jonas ook komt. ‘Ja, graag,’ zegt hij.",
    "Voor ze naar binnen gaan, vraagt Jonas hoe het met Lina gaat. ‘Het gaat goed. Ze leert haar naam schrijven,’ zegt Noor. Op een papiertje staan vier letters. Lina leest haar naam langzaam en zwaait naar Jonas. ‘Doei!’ roept ze."
  ],
  [
    "Een foto van de familie",
    "Goedemiddag! Mijn naam is Adam. Ik ben tien jaar en ik woon in Nederland. Vandaag komt mijn familie bij ons thuis. Mijn moeder vraagt: ‘Hoe gaat het met oma?’ Mijn vader zegt: ‘Goed. Ze komt om elf uur.’",
    "Eerst komt mijn zus. Ze heeft haar dochter bij zich. Het kind heet Emma en is drie jaar. Even later komt mijn broer met zijn vrouw. Zij zijn dit jaar getrouwd. Mijn oma en opa komen samen aan. ‘Hoi allemaal!’ zegt opa.",
    "Mijn vader wil een foto maken. Mijn moeder zit naast oma en ik sta naast mijn zus. Emma zegt mijn naam zacht. Ik vraag: ‘Welke letter hoor je eerst?’ Ze denkt even en zegt: ‘A!’ We lachen en maken nog een foto.",
    "Aan het eind van de middag gaan mijn broer en zijn vrouw naar huis. Ik zwaai voor het raam en roep: ‘Tot ziens!’ Emma zegt ook ‘doei’. De foto gaat met haar mee."
  ],
  [
    "Mijn oom vraagt wie de kaart naar oma brengt. ‘Ik ga met mijn nicht,’ zeg ik. We zijn allebei blij, want oma woont niet ver. Mijn oom heeft geen tijd om mee te gaan. Hij blijft bij de baby. ‘Hebben jullie de kaart?’ vraagt hij. Ik kijk in mijn tas. ‘Ja, ik heb hem.’",
    "Bij het huis van oma staat mijn tante al bij de deur. ‘Waar komen jullie vandaan?’ vraagt ze. ‘Van het huis van mijn oom,’ zegt mijn nicht. Mijn tante leest de kaart hardop. Ze vraagt: ‘Wie heeft deze zin geschreven?’ Mijn nicht wijst naar mij.",
    "Oma leest de woorden nog een keer. ‘Wat een mooie kaart,’ zegt ze. ‘Hier is nog plaats voor de naam van de baby.’ We zoeken een pen. Mijn tante schrijft de naam bij de andere namen. Dan zet oma de kaart bij het raam."
  ],
  [
    "Wie staat er op de kaart?",
    "In de les krijgen we een kaart met een grote foto. De docent vraagt: ‘Wie is dit?’ Ik kijk naar de vrouw op de foto. ‘Dat is mijn tante,’ zegt Mila. ‘Ze heeft twee kinderen. Haar zoon is mijn neef en haar dochter is mijn nicht.’",
    "Daarna lezen we een korte zin op de kaart. De zin begint met een hoofdletter en eindigt met een punt. Mila vraagt: ‘Waar komt jouw familie vandaan?’ Ik schrijf mijn antwoord op: ‘Mijn familie komt uit Polen. Wij zijn nu hier in Nederland.’",
    "De docent schrijft huis en neus op het bord. We luisteren goed naar de twee klanken. Dan vraagt hij: ‘Heb jij thuis een foto van je familie?’ Ik zeg: ‘Ja, ik heb een foto van mijn oom met zijn baby.’",
    "Aan het einde leest ieder zijn antwoord. Ik hoor veel verschillende namen. Ik vind de vragen leuk, want nu weet ik meer over de mensen in de klas."
  ],
  [
    "Na het lezen gaat Amir naar de computer. Hij typt drie woorden. Het eerste woord begrijpt hij, maar het tweede woord vindt hij moeilijk. Zijn vriendin zegt het woord nog een keer. Amir schrijft het op en leest het langzaam. Daarna vraagt hij aan de docent hoeveel woorden ze vandaag moeten leren.",
    "De docent noemt eerst tien woorden en schrijft daarna het getal dertig op het bord. ‘Dat zijn de woorden van deze week,’ zegt hij. ‘Vandaag leren we er tien.’ Amir kijkt op de klok. Er is nog tijd om samen te lezen.",
    "Aan het eind van de les vraagt de docent: ‘Welke dag is het morgen?’ Amir kijkt in zijn agenda. ‘Dinsdag,’ zegt hij. ‘Morgen kom ik weer.’ Buiten praat hij met zijn vriendin. Samen lopen ze naar huis en herhalen ze de moeilijke woorden."
  ],
  [
    "Van nul tot vijftig",
    "Op woensdag zit Laila voor het eerst in een Nederlandse les. Buiten is het stil, maar binnen zijn veel mensen. Op het bord staan de getallen nul, één, twee en drie. De cursisten lezen de getallen samen. Laila schrijft ze in haar boek.",
    "De docent vraagt: ‘Hoeveel cursisten zijn er vandaag?’ Laila telt de mensen in de klas. ‘Twintig,’ zegt ze. Daarna schrijft de docent dertig, veertig en vijftig op het bord. Hij zegt de getallen eerst snel en daarna langzaam. ‘Wat zegt u?’ vraagt Laila bij het laatste getal.",
    "Naast Laila zit een man met een computer. Hij typt vijftig. Nu begrijpt Laila het woord. Ze schrijft het naast het getal 50. Daarna vraagt ze wanneer de volgende les is. ‘Op vrijdag,’ zegt de docent.",
    "Laila kijkt in haar agenda. Vrijdag heeft ze tijd. Voor ze naar buiten gaan, lezen de cursisten de getallen nog een keer."
  ],
  [
    "Na de pauze ligt er een gum op mijn tafel. Niemand weet van wie hij is. Ik geef de gum aan Sara. ‘Alsjeblieft,’ zeg ik. ‘Bedankt,’ zegt ze. Ze gebruikt de gum voor een fout op bladzijde tien. Daarna trekt ze een lijn van het woord naar het juiste plaatje.",
    "De docent vraagt welke maand na maart komt. Ik steek mijn hand op. ‘April,’ zeg ik. Sara schrijft de datum boven haar opdracht. Bij het laatste antwoord zet ze een klein kruisje. We kijken samen of haar antwoorden goed zijn.",
    "Aan het einde vraagt de docent om het hele werkwoord bij ‘ik drink’. Sara zegt: ‘Drinken.’ Dan geeft hij nog een voorbeeld. Ik begrijp het nu ook. We ruimen de klas op. De docent vraagt of wij morgen met een nieuwe opdracht willen beginnen."
  ],
  [
    "Een opdracht op de eerste dag",
    "Het is de eerste dag van de maand. In de klas schrijft de docent de datum op het bord. Daarna zegt hij: ‘Open je boek op bladzijde twaalf.’ Nina kijkt naar het plaatje. Ze moet kiezen welk woord bij de afbeelding past. Ze zet een kruisje naast haar antwoord.",
    "Bij de volgende opdracht trekt Nina een lijn tussen twee woorden. ‘Hoe spel je dat?’ vraagt ze aan Victor. Victor zegt de letters langzaam. Nina maakt een fout en gebruikt een gum. ‘Mag ik jouw pen even?’ vraagt Victor. ‘Alsjeblieft,’ zegt Nina.",
    "In de pauze drinkt Victor koffie. Nina drinkt graag thee. Ze oefenen de ik-vorm van drinken. ‘Ik drink thee,’ zegt Nina. ‘Wij drinken samen,’ zegt Victor. Dan kijken ze weer naar hun opdracht.",
    "Voor ze naar huis gaan, geeft Nina de pen terug. ‘Dank je wel voor je hulp,’ zegt ze. Victor antwoordt: ‘Graag gedaan.’"
  ],
  [
    "Eva kijkt naar boven. Ze heeft haar jas nog aan. Ik laat haar de slaapkamer zien. Naast het bed staat een kleine kast. De deur van de badkamer is wit. In de badkamer zijn een douche en een bad. De gang is smal, maar op het balkon is genoeg plaats voor twee stoelen.",
    "‘Woon je hier alleen?’ vraagt Eva. Ik zeg dat ik hier met mijn broer woon. Mijn broer is vandaag niet thuis. Als hij terugkomt, brengt hij een gele lamp mee. Die zetten we straks naast de bank. Eva vindt geel een mooie kleur. Zelf heeft ze een bruine bank.",
    "Bij de deur vraagt ze hoe ik mijn naam spel. Ik zeg de letters langzaam. Zij schrijft mijn naam op een briefje. Morgen komt ze weer langs. Dan drinken we koffie op het balkon als het mooi weer is."
  ],
  [
    "Een blauwe deur en een groene bank",
    "Mijn buurman heet Mark. Hij woont in een huis met een garage. De voordeur is blauw en het dak is grijs. Mark nodigt mij uit voor thee. Via de gang gaan we naar de woonkamer. Daar staat een groene bank naast een bruine kast.",
    "Mark heeft boven twee slaapkamers. In de eerste kamer staat een bed. In de tweede kamer staan een oude stoel en een tafel. Hij laat ook de badkamer zien. ‘De douche is nieuw,’ zegt hij. ‘Het bad is oud, maar ik gebruik het graag.’",
    "We gaan weer naar beneden. Op tafel staan twee witte kopjes. De buurvrouw komt ook even langs. Ze stelt zich voor: ‘Ik ben Sara.’ We praten over onze huizen en drinken thee. Sara zegt dat ze een beetje Nederlands spreekt.",
    "Bij de deur vraag ik hoe Mark zijn naam schrijft. Hij spelt zijn naam langzaam. Morgen komt hij bij mij langs. Dan ziet hij mijn nieuwe rode lamp."
  ],
  [
    "Ik wacht bij de lift. Op de tweede verdieping woont een aardige man. Hij kent de verhuurder. Hij zegt dat er beneden ook een deur is. We pakken de lift naar de eerste verdieping, maar ook die deur is op slot. De man lacht. ‘Zonder sleutel kunnen we niet naar binnen.’",
    "De verhuurder komt terug met de sleutel. De flat is klein, maar ik vind de buurt fijn. Ik vraag hoeveel kamers de flat heeft. ‘Twee,’ zegt hij. ‘De eerste kamer is groter dan de tweede.’ Buiten hoor ik veel auto’s. De straat is nu een beetje druk.",
    "Thuis schrijf ik mijn vragen op. Ik maak korte hoofdzinnen. In de eerste zin staat: ‘Ik wil de flat huren.’ In de tweede staat: ‘De flat ligt dichtbij mijn werk.’ Daarna kies ik welke vragen ik morgen wil stellen."
  ],
  [
    "Te huur in een rustig dorp",
    "Op internet staat een woning te huur in een klein dorp. Ik bel de verhuurder. Hij zegt dat de woning op de eerste verdieping ligt. In het gebouw is een lift. ‘Kan ik de woning zien?’ vraag ik. Hij zegt dat ik nu kan komen.",
    "De buurt is rustig. Bij de deur wacht een aardige vrouw. Ze heeft de sleutel in haar tas. Eerst kijken we naar de woonkamer. Daarna gaan we naar de tweede kamer. Ik schrijf op hoeveel kamers er zijn. De derde kamer ligt aan de straat.",
    "Als we naar buiten gaan, valt de deur dicht. De verhuurder pakt haar tas en zoekt de sleutel. Gelukkig heeft ze hem nog. ‘De deur zit snel op slot,’ zegt ze. We lachen en gaan weer naar binnen.",
    "Later schrijf ik een korte hoofdzin in mijn schrift: ‘De woning ligt in een rustig dorp.’ Ik kies de woning omdat ze dichtbij mijn familie ligt."
  ],
  [
    "Voor het avondeten wil mijn zus ook kip. Ze vraagt of er nog kip in de koelkast ligt. Ik kijk, maar er is geen kip meer. Er zijn wel aardappelen. ‘Dan eten we vanavond aardappelen bij de soep,’ zegt ze. Ze kookt ze in water. Ik zet de glazen naast de borden.",
    "Mijn broer vraagt wat er in de soep zit. Ik zeg dat er ook een beetje bloemkool in zit. Hij vindt bloemkool niet altijd lekker, maar hij wil de soep wel proeven. Mijn zus vraagt: ‘Wanneer eten we?’ Ik zeg: ‘Nu. Het eten is klaar.’",
    "Na het eten blijft er één boterham over. Mijn broer wil die morgen meenemen voor de lunch. Ik geef hem een bord en hij doet de boterham in zijn tas. Daarna drinken we allemaal een glas water. Mijn zus vraagt of we volgende week weer samen koken."
  ],
  [
    "Wat eet jij bij de lunch?",
    "Vandaag vraag ik mijn collega wat hij bij de lunch eet. Hij eet altijd een boterham met kaas. Ik eet graag brood met kip, maar ik heb vandaag geen brood bij me. In de winkel bij mijn werk koop ik brood, boter en een appel.",
    "Om twaalf uur maken we samen de lunch klaar. We zetten de borden op tafel en doen water in de glazen. Mijn collega vraagt: ‘Wil jij een appel of een boterham?’ Ik zeg dat ik eerst een boterham eet. ‘Eet smakelijk!’ zegt hij.",
    "Na het werk ga ik weer naar de winkel. Voor het avondeten wil ik soep koken. Ik heb aardappelen en een liter water nodig. Ik doe de aardappelen in de pan. Mijn broer legt brood op tafel en helpt met de borden.",
    "We eten ’s avonds samen. Mijn broer vraagt: ‘Vind jij deze soep lekker?’ Ik zeg ja en neem nog een klein bord soep."
  ],
  [
    "Bij de markt staat ook een kraam met druiven. Ik vraag hoeveel een kilo kost. De druiven zijn bijna vier euro per kilo. Dat vind ik duur. Ik koop een klein zakje en geef de man een briefje. Hij geeft mij het geld terug en zegt dat ik een fijne dag moet hebben.",
    "Thuis kijk ik op de bon. Ik zie het bedrag voor de appels, de citroen en de banaan. De banaan kost minder dan een euro. Dan kijk ik of ik genoeg eieren heb voor de appeltaart. Mijn dochter wil helpen. Ze vraagt waar we het fruit moeten leggen.",
    "De taart staat op tafel als mijn vriendin aankomt. Ik verdeel de taart in zes stukken. Mijn dochter leest het woord supermarkt op de bon in drie stukjes. Daarna krijgt ze zelf een stukje taart. Mijn vriendin vraagt: ‘Wie heeft de taart gemaakt?’ We wijzen naar elkaar."
  ],
  [
    "Bijna alles in de aanbieding",
    "Ik lees in de winkel dat het fruit vandaag goedkoop is. Een kilo bananen kost bijna één euro. Mijn zus wil ook druiven en citroenen kopen. Ik vraag aan de man: ‘Waar liggen de druiven?’ Hij wijst naar een tafel naast de appels.",
    "Daarna gaan we naar de markt. ‘Anders nog iets?’ vraagt een vrouw. ‘Ja, ik wil ook twee eieren voor mijn appeltaart,’ zegt mijn zus. Ik vraag hoeveel we moeten betalen. De vrouw noemt het bedrag en ik geef haar een briefje van tien euro. Ze geeft geld terug.",
    "In de supermarkt kopen we nog iets voor morgen. Mijn zus kijkt goed naar de prijzen. Bij de kassa vraagt ze om de bon. We lezen het woord supermarkt en verdelen het in drie lettergrepen.",
    "Thuis snijden we de appeltaart in stukken. Mijn zus vindt de taart lekker. ‘Volgende week gebruiken we peren,’ zegt ze."
  ],
  [
    "De volgende dag zit ik vroeg bij de assistente. Ze vraagt welk been pijn doet. Ik wijs naar mijn rechterbeen. Ik kan mijn voet goed bewegen, maar lopen doet veel pijn. Ik vertel dat ik gisteren op mijn knie ben gevallen. Mijn hand en mijn schouder doen ook een beetje pijn.",
    "De assistente schrijft mijn naam op en zegt dat ik even kan wachten. Ik zie een poster met een gezicht. Op de poster staan het oog, de neus en de kin. Ik lees de woorden langzaam. Bij het woord schouder hoor ik twee lettergrepen. Ik zoek waar de klemtoon ligt.",
    "Na de controle ga ik naar huis. Ik schrijf in mijn schrift: één been, twee benen. Ik schrijf ook één voet en twee voeten. Bij been hoor ik een lange klank. Ik oefen de woorden nog eens hardop en kijk of ik ze goed kan lezen."
  ],
  [
    "Eén voet, twee voeten",
    "Mijn zoon heeft pijn aan zijn voet. Ik bel de assistente en vraag om een afspraak. Ze vraagt of het vandaag kan. ‘Ja, graag. Kan het wat eerder?’ vraag ik. We krijgen een afspraak om half elf. Mijn zoon legt zijn voet op een stoel terwijl we wachten.",
    "Hij heeft ook pijn aan zijn knie en zijn been. Ik wijs naar zijn voet en vraag: ‘Hoe heet dit in het Nederlands?’ Hij zegt ‘voet’. In zijn schrift schrijft hij het enkelvoud en het meervoud: voet en voeten. Daarna oefenen we neus, lip en kin.",
    "Bij de controle vraagt de assistente waar de pijn zit. Mijn zoon wijst naar de tenen. Hij kan zijn hand en arm goed bewegen. Dat vertelt hij ook. Hij luistert goed naar de woorden van de assistente.",
    "Thuis zoeken we een paar woorden op in het woordenboek. We luisteren naar de klanken en zetten een streep onder de lettergreep met de klemtoon."
  ],
  [
    "Bij de apotheek vraagt iemand of ik mijn voornaam wil spellen. Ik spel de letters rustig en zeg ook mijn achternaam. De apotheker zoekt mijn naam en komt terug met een klein doosje. Op het doosje staat hoe vaak ik het medicijn moet innemen. Ik lees de tekst nog een keer.",
    "Thuis belt een vriend. Hij vraagt of ik me erg ziek voel. Ik zeg dat ik vooral hoest en dat mijn keel pijn doet. Hij zegt: ‘Beterschap!’ Ik blijf die avond thuis en drink genoeg water. De volgende dag voel ik me al wat beter.",
    "Bij de tandarts staat een stoel achter een scherm. Ik ga zitten en doe mijn mond open. De tandarts bekijkt mijn gebit. ‘Helaas, hier zie ik een klein gaatje,’ zegt ze. Ze laat de foto zien. Daarna krijg ik een nieuwe afspraak."
  ],
  [
    "Een klein gaatje",
    "Mevrouw De Vries belt de tandarts. Ze heeft pijn aan een tand. De assistente vraagt naar haar voornaam en achternaam. ‘Mijn voornaam is Noor,’ antwoordt ze. ‘Ik kan vanmiddag komen.’ De afspraak is om drie uur.",
    "De tandarts vraagt: ‘Wat zijn uw klachten?’ Noor wijst naar een tand achter in haar mond. De tandarts maakt een foto van haar gebit. ‘Helaas, er zit een gaatje,’ zegt hij. Hij legt uit wat Noor bij de volgende afspraak kan verwachten.",
    "Na het bezoek gaat Noor langs de apotheek. Daar haalt ze ook een doosje op voor haar man. Hij heeft griep en moet veel hoesten. Op het doosje staat hoe hij het medicijn moet innemen. Noor vraagt wat een woord op het doosje betekent.",
    "Thuis belt ze haar man. Ze zegt dat ze het doosje heeft. Hij bedankt haar. ‘Beterschap,’ zegt Noor. Daarna schrijft ze de volgende afspraak in haar agenda."
  ],
  [
    "Mijn zus ziet een bril naast de armbanden. Ze zet de bril op en kijkt in de spiegel. Ik probeer een hoed, maar die is te groot. De medewerker vraagt welke hoed ik wil proberen. Ik wijs naar een kleinere hoed en vraag of er ook een blauwe is.",
    "Even later past mijn zus een bloes. Aan de bloes zit een kleine knoop. Ze vraagt of de medewerker haar even kan helpen. Ik heb inmiddels een nieuwe broek aan. We kijken naar elkaar en zeggen allebei dat de kleding goed zit.",
    "Voor we naar huis gaan, kiezen we de blauwe jurk en de broek. Thuis trekken we onze nieuwe kleren aan. Mijn zus doet haar armband om. Ik vraag welke schoenen ik zal dragen. Ze wijst naar mijn witte schoenen en zegt dat die mooi bij de broek passen."
  ],
  [
    "Een overhemd voor het feest",
    "Mijn broer gaat zaterdag naar een feest. Hij wil een nieuw overhemd dragen. In de winkel kijkt hij eerst naar de jassen en broeken. Hij ziet een wit overhemd, maar er mist een knoop. ‘Een moment alstublieft,’ zegt de medewerker. Ze haalt een ander overhemd.",
    "Ik draag vandaag een jurk. Bij de kassa zie ik een rode armband. Mijn broer vraagt: ‘Welke armband wil je hebben?’ Ik kies de kleine. Hij probeert ook een hoed en kijkt in de spiegel. Die past goed bij zijn jas.",
    "Thuis oefenen we de woorden uit de winkel. We zoeken het lidwoord van overhemd op in het woordenboek. We schrijven ‘het overhemd’ en ‘de broek’ op een blad. Daarna zoeken we het meervoud van jas.",
    "Voor het feest trekken we onze kleren aan. Mijn broer draagt zijn nieuwe overhemd. Ik draag mijn jurk en de armband. We zijn allebei klaar om te gaan."
  ],
  [
    "De volgende ochtend kijk ik op de klok. Het is negen uur. De winkel gaat pas om tien uur open. Ik leg mijn lichte kleren apart en hang de natte rok op. Mijn andere rok is al droog. Die trek ik aan voor ik vertrek.",
    "In de winkel vraagt de medewerker hoe groot het gat is. Ik laat het zien. Zij kijkt of ze dezelfde rok nog heeft. ‘We hebben de rok hier niet, maar ik kan hem bestellen,’ zegt ze. Het duurt ongeveer een week voor de rok er is.",
    "Ik vraag of ze hem naar mijn huis kan brengen. Dat kan op vrijdagavond. Ik schrijf de tijd op. Thuis kijk ik bij de wasmachine. Alles is klaar. Ik hang de laatste kleren op en zet de wasmand weer in de kast."
  ],
  [
    "Hoe laat gaat de winkel dicht?",
    "Het is zaterdagavond. Mijn trui heeft een gat en ik wil een nieuwe bestellen. Ik kijk op de klok. Het is vijf uur. ‘Hoe laat gaat de winkel dicht?’ vraag ik aan mijn broer. Hij kijkt op internet. ‘Om zes uur,’ zegt hij.",
    "Ik loop naar de winkel. Het duurt ongeveer een half uur. De medewerker zoekt dezelfde trui voor me. ‘Een ogenblik alstublieft,’ zegt ze. Ze komt terug met een donkere trui. Die past goed. Mijn andere trui wil ik thuis nog maken.",
    "Thuis was ik mijn kleren. Ik doe de donkere kleren apart. Op het label staat dertig graden. Ik kijk goed naar het getal. Mijn zus wil alles samen wassen, maar vandaag doen we twee kleine wassen.",
    "Na een half uur haal ik mijn kleren uit de machine. Ik hang alles netjes op. Morgen is mijn nieuwe trui droog en kan ik hem aan."
  ],
  [
    "Ik zet mijn fiets naast een bord. Op het bord staat een regel: fietsen mogen hier niet blijven staan. Daarom zet ik de fiets achter een klein gebouw. Mijn tas neem ik mee. In de tas zitten een kaart van Nederland en een fles water.",
    "Bij de boot ontmoet ik een vrouw die ook naar het eiland gaat. Ze vraagt hoe lang de reis duurt. Ik kijk op de kaart en zeg dat het eiland niet ver is. De vrouw komt uit Amsterdam, de hoofdstad van Nederland. Zij is nog nooit op dit eiland geweest.",
    "Mijn collega belt weer. Hij staat nog in de file. Ik geef door hoe laat de volgende boot gaat. Hij zegt dat hij later komt. Ik ga alvast aan boord. Naast het raam is een plaats vrij. Ik zet mijn tas onder de stoel en wacht tot de boot vertrekt."
  ],
  [
    "Hoe gaan we op reis?",
    "Mijn collega en ik gaan vandaag naar een eiland. Hij wil met de auto gaan, maar ik wil met de trein en de boot. Op de kaart kijken we waar de haven ligt. De afstand naar de haven is ongeveer tien kilometer.",
    "We gaan eerst op de fiets naar het station. Bij het fietspad staat een bord. ‘Let op!’ staat erop. We volgen de regels en stoppen voor een drukke weg. Mijn collega heeft zijn tas achter op zijn fiets. Mijn kaart zit in mijn tas.",
    "Bij het station belt een andere collega. Hij komt met de bus en is laat. Hij vraagt of we alvast kunnen gaan. We geven door waar we op hem wachten. Het is druk op de weg en de bus staat in de file.",
    "We wachten naast de ingang. Even later komt hij aan. We kunnen nu samen verder. De boot vertrekt over een uur, dus we hebben nog genoeg tijd."
  ],
  [
    "Een vrouw bij de halte hoort mijn vraag. Ze zegt dat ik nog drie haltes moet blijven zitten. Ik kijk naar het bord in de bus. Daar staat de naam van de volgende halte. Gelukkig hangt er ook een kaart. Ik zie onze straat dichtbij de derde halte.",
    "De chauffeur zegt dat we om tien uur aankomen. Ik stuur een bericht naar mijn vriendin. Zij wacht bij het kruispunt. Eerst loopt ze naar rechts, maar ik sta links van de halte. Ik bel haar en zeg dat ze bij het bord moet blijven wachten.",
    "Als ik uitstap, herken ik haar jas. Ze zwaait en zegt: ‘Eindelijk ben je er!’ We lopen naar haar huis. Voor het eten wil ik het woord kruispunt opzoeken. Mijn vriendin laat zien waar de twee straten bij elkaar komen. Nu begrijp ik de betekenis."
  ],
  [
    "De bus na de trein",
    "Op vrijdag pak ik mijn tas en loop ik naar het station. Om acht uur vertrekt mijn trein. Ik kom vroeg aan en kijk op het bord. Gelukkig gaat de trein op tijd. Ik stuur een bericht naar mijn broer. Zijn bus komt later.",
    "Na de trein zoek ik de bushalte. Ik vraag aan een man bij het kruispunt: ‘Waar kan ik de bus nemen?’ Hij zegt: ‘Ga eerst linksaf. De halte is dichtbij.’ Ik volg zijn uitleg en kijk naar het bord bij de halte.",
    "Onze bus komt over tien minuten. Als hij aankomt, vraag ik aan de chauffeur of hij bij onze straat stopt. De chauffeur zegt dat ik tot de derde halte moet blijven zitten. Boven de voorste stoel hangt een kaart met de route.",
    "Bij de derde halte stapt mijn broer in. Samen gaan we naar de stad. Daar zoeken we in een woordenboek de betekenis van het woord overstappen op."
  ],
  [
    "Mijn vriendin legt uit hoe de club werkt. Iedereen mag een keer komen kijken. Bij de ingang staat een man met informatie over de lessen. Ik vraag wanneer ik kan beginnen. Hij zegt dat ik eerst mijn naam en telefoonnummer op het formulier moet invullen.",
    "Op het veld ligt een bal. We bewegen een beetje en lopen achter de bal aan. Ik vind het leuk, maar ik ben na tien minuten al moe. Mijn vriendin zegt dat ik rustig mag beginnen. Daarna praten we over onze andere hobby’s. Zij houdt van dansen en ik houd van fietsen.",
    "Thuis kijk ik naar de nieuwe woorden. Ik lees eerst ‘de hond’ en daarna ‘het paard’. Ik let op het lidwoord. Daarna schrijf ik een hoofdzin met twee werkwoorden: ‘Ik wil voetballen.’ Ik zet het hele werkwoord aan het einde."
  ],
  [
    "Een formulier voor de club",
    "Mijn zus zoekt een nieuwe hobby. Ze houdt van dieren en wil na haar werk graag bewegen. Op zaterdag gaat ze eerst naar de boerderij. Daar helpt ze met de paarden. De hond loopt de hele ochtend met haar mee.",
    "In de middag kijken we bij de voetbalclub. Een dame bij de deur geeft ons informatie. Iedereen mag vandaag een keer met de bal spelen. Mijn zus vindt het leuk en wil zich inschrijven. Daarom vult ze haar naam, adres en e-mailadres op een formulier in.",
    "Ik geef haar mijn pen. Daarna schrijf ik twee zinnen op over onze dag: ‘Ik wil bewegen’ en ‘Zij kan goed voetballen.’ We kijken waar het hele werkwoord staat. Het staat aan het einde van de hoofdzin.",
    "Thuis oefenen we de woorden van de boerderij. We tellen de dieren op een foto. We schrijven het lidwoord en het meervoud bij de woorden die we al kennen."
  ],
  [
    "De volgende ochtend schijnt de zon. Ik zet koffie bij de tent. Naast de tent staan bloemen. Mijn vriendin wijst naar een vogel. Ik versta de naam niet goed. Ze herhaalt de naam langzaam. Ik schrijf hem op in mijn boek. We lopen daarna naar het strand.",
    "Bij het strand zien we een bord over een museum. Het museum is dichtbij. Mijn vriend wil erheen, maar ik wil eerst in de zee kijken. We spreken af dat ieder iets mag kiezen. Na de zee bezoeken we het museum. Daar zien we ook een korte film.",
    "Na het museum gaan we naar een café. We vertellen elkaar wat we leuk vonden. Mijn vriend zingt een liedje dat hij in de film hoorde. Ik vraag hem om het nog een keer te zingen. Daarna schrijf ik een kaart naar huis. Ik eindig met ‘Groetjes!’"
  ],
  [
    "Een dagje weg aan zee",
    "Dit weekend gaan we een dagje weg. Als het weer mooi is, fietsen we naar zee. Mijn vriendin neemt brood mee. Ik neem een boek en wat water mee. Bij het strand leggen we onze spullen naast elkaar op het zand.",
    "We wandelen langs de zee en kijken naar de vogels. ‘Wat bedoel je?’ vraagt mijn vriendin als ik iets over een vogel zeg. Ze verstaat me niet door de wind. Ik zeg het nog een keer, langzaam. Dan wijst ze naar een andere vogel.",
    "Later gaan we naar een museum. Bij de ingang hangt een bord over een concert vanavond. Ik heb zin om te gaan, maar mijn vriendin wil liever uit eten. We gaan eerst naar een restaurant en daarna luisteren we samen naar muziek.",
    "Voor we naar huis gaan, drinken we iets in een café. We praten over de dag. Ik schrijf aan mijn zus: ‘We hebben veel plezier gehad. Groetjes van ons allebei!’"
  ]
];
const readings = themes.map((theme, index) => {
  const middle = Math.ceil(theme.sections.length / 2);
  const groups = [theme.sections.slice(0, middle), theme.sections.slice(middle)];
  return groups.flatMap((group, part) => {
    const [heading, firstParagraph] = readingTexts[index][part];
    const offset = index * 4 + part * 2;
    const continuation = readingExtensions[offset];
    const [newHeading, ...newParagraphs] = readingExtensions[offset + 1];
    return [[heading, [firstParagraph, ...continuation]], [newHeading, newParagraphs]].map(
      ([heading, paragraphs], order) => ({
        heading, paragraphs, id:'reading-' + theme.number + '-' + (part * 2 + order + 1),
        range:group[0].id + '–' + group.at(-1).id,
        entries:group.flatMap(section => section.words)
      })
    );
  });
});
const readingById = new Map(readings.flat().map(text => [text.id,text]));
const readingWords = new Map(words.map(word => [word.id,word]));
function readingVocabulary(entries) {
  const glossary = new Map();
  for (const word of entries) {
    const forms = word.nl.replace(/\s*\*$/, '').split(/\s*[,/]\s*|\s*\(|\)\s*/);
    for (const form of [word.answer, ...forms]) {
      const cleaned = form.trim().replace(/[.!?]+$/, '');
      const bare = cleaned.replace(/^(?:de|het) /i, '');
      for (const candidate of [cleaned, bare]) {
        if (candidate.length < 3 || !/^[\p{L}][\p{L}’' -]*$/u.test(candidate)) continue;
        const key = normalize(candidate);
        if (!glossary.has(key)) glossary.set(key, word);
      }
    }
  }
  return glossary;
}
function readingBody(text, interactive) {
  if (!interactive) return text.paragraphs.map(p => '<p lang="nl">' + escapeHtml(p) + '</p>').join('');
  const glossary = readingVocabulary(text.entries);
  const pattern = [...glossary.keys()].sort((a,b) => b.length-a.length)
    .map(term => term.replace(/'/g, "['’]")).join('|');
  const matcher = new RegExp('(?<![\\p{L}])(?:' + pattern + ')(?![\\p{L}])', 'giu');
  return text.paragraphs.map(paragraph => {
    let body = '';
    let end = 0;
    for (const match of paragraph.matchAll(matcher)) {
      const word = glossary.get(normalize(match[0]));
      body += escapeHtml(paragraph.slice(end, match.index)) +
        '<button class="reading-word" type="button" data-reading-word="' + word.id +
        '" aria-haspopup="dialog">' + escapeHtml(match[0]) + '</button>';
      end = match.index + match[0].length;
    }
    return '<p lang="nl">' + body + escapeHtml(paragraph.slice(end)) + '</p>';
  }).join('');
}
function readingArticle(text, interactive) {
  return '<article class="reading-sheet"><h1 lang="nl" tabindex="-1">' + escapeHtml(text.heading) +
    '</h1><p class="reading-range">Lüğət · ' + text.range + '</p>' +
    (text.chapters ? text.chapters.map(chapter => '<section><h2 lang="nl">' +
      escapeHtml(chapter.heading) + '</h2>' + readingBody({...text,paragraphs:chapter.paragraphs},interactive) +
      '</section>').join('') : readingBody(text, interactive)) + '</article>';
}
const printReading = '<button type="button" id="print-reading" class="action">Print PDF</button>';
function readingPage() {
  return '<div class="reading-index">' + title('Reading') + printReading +
    (generatedStory ? '<a class="card reading-text" href="#reading-generated">' + escapeHtml(generatedStory.heading) + '</a>' : '') +
    readings.map((texts, index) => '<section class="reading-theme"><h2 lang="nl">' +
      themes[index].number + '. ' + escapeHtml(themes[index].title) + '</h2>' +
      texts.map(text => '<a class="card reading-text" href="#' + text.id + '"><h3 lang="nl">' +
        escapeHtml(text.heading) + '</h3><p class="reading-range">Lüğət · ' + text.range +
        '</p></a>').join('') + '</section>').join('') + '</div>' +
    '<div class="reading-print-all">' + readings.flat().map(text => readingArticle(text, false)).join('') + '</div>';
}
function readingDetail(text) {
  return '<div class="reading-controls"><a href="#reading">Reading</a>' + printReading + '</div>' +
    readingArticle(text, true) + '<dialog id="reading-gloss" aria-labelledby="reading-gloss-word">' +
    '<form method="dialog"><button type="submit" aria-label="Bağla">×</button></form>' +
    '<h2 id="reading-gloss-word" lang="nl"></h2><p id="reading-gloss-definition" lang="en"></p></dialog>';
}
function handleReadingClick(event) {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.id === 'print-reading') {
    if (window.AndroidReading) window.AndroidReading.print();
    else window.print();
    return;
  }
  const word = readingWords.get(button.dataset.readingWord);
  if (!word) return;
  document.getElementById('reading-gloss-word').textContent = word.nl;
  document.getElementById('reading-gloss-definition').textContent = word.en;
  document.getElementById('reading-gloss').showModal();
}
