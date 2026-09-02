import fs from 'node:fs';
import path from 'node:path';

const itJsonPath = path.resolve('theme/i18n/translations/it.json');
const itData = JSON.parse(fs.readFileSync(itJsonPath, 'utf8'));

itData.brand = "Convertitore da GMT a EST";
itData.pages.home.title = "Convertitore da GMT a EST | Conversione dell'ora in tempo reale";
itData.pages.home.seoTitle = "Convertitore da GMT a EST | Conversione dell'ora in tempo reale";
itData.pages.home.h1 = "Convertitore da GMT a EST";
itData.pages.home.description = "Converti facilmente l'ora GMT nell'ora della costa orientale degli Stati Uniti (EST/EDT). Orologi in tempo reale, gestione dell'ora legale e tabella 24 ore.";
itData.pages.home.keywords = "convertitore GMT EST, da GMT a EST, convertire GMT in EST, ora GMT, ora New York, differenza GMT EST, EST EDT, fuso orario New York, ora legale Stati Uniti, differenza oraria Italia New York";

itData.pages.gmtToAkdt = {
  title: "Convertitore da GMT a AKDT | Orario Alaska in tempo reale",
  h1: "Convertitore da GMT a AKDT",
  description: "Converti l'ora GMT in AKDT e AKST in tempo reale con orologi sincronizzati dell'Alaska, gestione dell'ora legale e tabella a 24 ore.",
  image: "/assets/world-time-map.svg",
  imageAlt: "Convertitore da GMT a AKDT - Orologi in tempo reale per l'Alaska"
};

itData.pages.gmtToAwst = {
  title: "Convertitore da GMT a AWST | Orario Perth in tempo reale",
  h1: "Convertitore da GMT a AWST",
  description: "Converti l'ora GMT in AWST all'istante. Orologi in tempo reale, tabella a 24 ore e calcolatore per l'Australia occidentale (Perth).",
  image: "/assets/world-time-map.svg",
  imageAlt: "Convertitore da GMT a AWST - Orologi in tempo reale per Perth"
};

itData.pages.witaToEst = {
  title: "Convertitore da WITA a EST | Indonesia centrale verso New York",
  h1: "Convertitore da WITA a EST",
  description: "Converti l'ora WITA (Indonesia centrale / Bali) nell'ora della costa orientale (EST/EDT) con orologi in tempo reale e fasce di lavoro condivise.",
  image: "/assets/world-time-map.svg",
  imageAlt: "Convertitore da WITA a EST - Orologi in tempo reale Indonesia e USA"
};

itData.pages.gmtToMet = {
  title: "Convertitore da GMT a MET | Fuso orario europeo in tempo reale",
  h1: "Convertitore da GMT a MET",
  description: "Converti l'ora GMT in MET e MEST (ora dell'Europa centrale) in tempo reale con orologi sincronizzati e tabella comparativa.",
  image: "/assets/world-time-map.svg",
  imageAlt: "Convertitore da GMT a MET - Orologi in tempo reale Greenwich ed Europa"
};

itData.pages.gmtToPdt = {
  title: "Convertitore da GMT a PDT | Orario costa ovest in tempo reale",
  h1: "Convertitore da GMT a PDT",
  description: "Converti l'ora GMT nell'ora legale del Pacifico (PDT) in tempo reale. Orologi sincronizzati, tabella a 24 ore e gestione dell'ora legale.",
  image: "/assets/world-time-map.svg",
  imageAlt: "Convertitore da GMT a PDT - Orologi in tempo reale Greenwich e costa del Pacifico"
};

itData.nav = {
  gmtToEst: "Convertitore da GMT a EST",
  estToGmt: "Convertitore da EST a GMT",
  gmtVsEst: "Differenza GMT vs EST",
  guide: "Guida ai fusi orari",
  blog: "Blog",
  author: "Autori",
  language: "Lingua",
  worldClock: "Orologio mondiale",
  meetingPlanner: "Pianificatore di riunioni",
  map: "Mappa dei fusi orari",
  developerTools: "Strumenti per sviluppatori",
  search: "Cerca...",
  searchAriaLabel: "Cerca nel sito (Ctrl+K)",
  searchPlaceholder: "Cerca città, fusi orari, convertitori o guide...",
  theme: "Tema"
};

itData.footer = {
  about: "Chi siamo",
  author: "Autori",
  gmtToEst: "Convertitore da GMT a EST",
  estToGmt: "Convertitore da EST a GMT",
  difference: "Differenza GMT vs EST",
  privacy: "Informativa sulla privacy",
  terms: "Termini di servizio",
  contact: "Contattaci",
  disclaimer: "Dichiarazione di non responsabilità",
  sitemap: "Mappa del sito",
  headings: {
    converters: "CONVERTITORI",
    guides: "GUIDE",
    tools: "STRUMENTI",
    regions: "REGIONI",
    company: "AZIENDA",
    contact: "CONTATTO",
    language: "LINGUA"
  }
};

itData.converter = {
  direction: "Direzione di conversione",
  from: "Da",
  toEastern: "a Eastern Time",
  toGmt: "a GMT",
  swap: "Inverti direzione di conversione",
  now: "Usa ora attuale",
  format: "Formato 24 ore",
  copy: "Copia",
  copied: "Copiato!",
  copyFailed: "Copia non riuscita",
  dstAware: "Ora legale inclusa",
  eastern: "Eastern Time",
  meetingPlanner: "Pianificatore di riunioni",
  is: "corrisponde a",
  hoursBehindGmt: "ore indietro rispetto a GMT",
  bestForScheduling: "Ideale per pianificare",
  convertsTo: "corrisponde a",
  variants: {
    converter: {
      startMode: "gmt-est",
      swap: true,
      "gmt-est": {
        heading: "Inserisci data e ora GMT",
        input: "Ora GMT",
        source: "GMT",
        target: "Eastern Time"
      },
      "est-gmt": {
        heading: "Inserisci data e ora Eastern Time",
        input: "Ora Eastern",
        source: "EST / EDT",
        target: "GMT"
      },
      note: "Inserisci data e ora GMT per ottenere il corrispondente orario EST o EDT in base alla data."
    },
    reverse: {
      startMode: "est-gmt",
      swap: false,
      heading: "Inserisci data e ora Eastern Time",
      input: "Ora Eastern",
      source: "EST / EDT",
      target: "GMT",
      note: "Inserisci un orario in Eastern Time per riconvertirlo all'istante in GMT."
    },
    difference: {
      startMode: "gmt-est",
      swap: false,
      heading: "Confronta GMT con Eastern Time",
      input: "Ora GMT da confrontare",
      source: "GMT",
      target: "EST / EDT",
      note: "Inserisci un orario GMT per visualizzare la denominazione esatta dell'Eastern Time e lo scarto attivo."
    },
    guide: {
      startMode: "gmt-est",
      swap: false,
      heading: "Pianifica un orario di riunione GMT",
      input: "Orario di riunione GMT",
      source: "GMT",
      target: "Orario di riunione Eastern",
      note: "Inserisci un orario di riunione GMT per conoscere l'equivalente Eastern Time per la tua agenda."
    },
    dynamic: {
      startMode: "gmt-est",
      swap: true,
      heading: "Inserisci data e ora {from}",
      input: "Ora {from}",
      source: "{from}",
      target: "{to}",
      note: "Inserisci data e ora {from} per verificare all'istante la conversione in {to}."
    }
  }
};

itData.visual = {
  eyebrow: "Laboratorio visivo",
  title: "Visualizza la differenza di fuso orario",
  cards: [
    {
      title: "Ritmo tra giorno e notte",
      text: "Scopri come l'orario lavorativo GMT coincide con la prima parte della giornata nella costa orientale degli Stati Uniti."
    },
    {
      title: "Scarto orario e ora legale",
      text: "La differenza oscilla tra 5 ore in inverno e 4 ore in estate quando la costa est adotta l'ora legale (EDT)."
    },
    {
      title: "Finestra per le riunioni",
      text: "Verifica i migliori intervalli di disponibilità comune prima di inviare un invito di calendario."
    }
  ]
};

itData.clocks = {
  title: "Orologi in tempo reale",
  gmt: "Ora attuale GMT (Londra)",
  eastern: "Ora attuale Eastern (New York)"
};

itData.presets = {
  title: "Scelte rapide",
  meeting: "Orario di riunione",
  event: "Evento in diretta",
  trading: "Orari di borsa"
};

itData.chart = {
  title: "Tabella di conversione da GMT a EST (24 ore)",
  eastern: "Eastern (EST/EDT)",
  offset: "Scarto"
};

itData.strip = {
  title: "Sovrapposizione orario lavorativo",
  aria: "Linea temporale di sovrapposizione tra GMT ed Eastern Time"
};

itData.intro_home = "Il Convertitore da GMT a EST offre una conversione oraria precisa e in tempo reale tra l'ora media di Greenwich (GMT/UTC) e il fuso orario della costa orientale del Nord America (Eastern Time, che comprende EST ed EDT). Calcola lo scarto orario attuale, consulta gli orologi sincronizzati e organizza le tue riunioni senza il rischio di commettere errori di calcolo legati all'ora legale. Questo strumento è stato progettato per professionisti che collaborano con gli Stati Uniti, team distribuiti, investitori nei mercati finanziari e viaggiatori che necessitano di un riferimento orario esatto e affidabile basato sulle regole ufficiali del database dei fusi orari IANA.";
itData.intro_difference = "spiega la differenza fondamentale tra il fuso orario GMT, un riferimento costante a UTC+0 privo di ora legale, e l'Eastern Time nordamericano, che alterna stagionalmente l'ora solare EST (UTC−5) e l'ora legale EDT (UTC−4).";
itData.intro_reverse = "Converti all'istante l'orario della costa orientale (EST/EDT) nell'ora media di Greenwich (GMT/UTC). Ideale per professionisti, ricercatori e organizzatori di eventi che comunicano dalla costa est con aree nel fuso GMT. Se desideri la conversione inversa, utilizza il nostro <a href=\"/it/\">Convertitore da GMT a EST</a>, oppure consulta la nostra <a href=\"/it/time-zone-guide/\">Guida ai fusi orari</a>.";
itData.intro_guide = "Una guida didattica ed esaustiva per comprendere i sistemi orari globali, il Tempo Coordinato Universale (UTC), il Greenwich Mean Time (GMT), l'Eastern Standard Time (EST) e i calendari dei passaggi all'ora legale. Per convertire l'orario della costa orientale in GMT, utilizza il nostro <a href=\"/it/est-to-gmt/\">Convertitore da EST a GMT</a>.";
itData.intro_dynamic = "Converti l'orario tra {from} e {to} all'istante. Questo strumento gestisce automaticamente le variazioni dell'ora legale, visualizzando lo scarto orario locale esatto, orologi in tempo reale e fasce di pianificazione per le riunioni.";

itData.explanation_difference = "Il Greenwich Mean Time (GMT) è il punto di riferimento a scarto zero per la coordinazione oraria mondiale e non adotta mai l'ora legale. L'Eastern Standard Time (EST) è 5 ore indietro rispetto a GMT (UTC−5). Tuttavia, durante il periodo dell'ora legale nordamericana (da marzo a novembre), la costa orientale passa all'Eastern Daylight Time (EDT, UTC−4), riducendo il divario orario a sole 4 ore. Questa alternanza stagionale fa sì che lo scarto tra le due zone oscilli regolarmente tra 5 ore in inverno e 4 ore in estate.";
itData.explanation_reverse = "Quando si converte l'ora dall'Eastern Time a GMT, è necessario aggiungere ore anziché sottrarle. In particolare, se la costa orientale è in ora solare (EST), si aggiungono 5 ore per ottenere il corrispondente orario GMT. Se la costa orientale è in ora legale (EDT), si aggiungono 4 ore. Ad esempio, le 09:00 EST corrispondono alle 14:00 GMT, mentre le 09:00 EDT corrispondono alle 13:00 GMT.";
itData.explanation_guide = "I fusi orari suddividono la Terra in 24 fasce teoriche, ciascuna corrispondente a 15 gradi di longitudine. Il Greenwich Mean Time (GMT) è nato come standard per la navigazione marittima basato sull'Osservatorio Reale di Greenwich a Londra. Oggi è largamente intercambiabile nell'uso civile con il Tempo Coordinato Universale (UTC), mantenuto con estrema precisione dagli orologi atomici mondiali. L'Eastern Standard Time (EST) rappresenta UTC−5 e copre la costa orientale del Nord America. Durante i mesi estivi, questi territori adottano l'Eastern Daylight Time (EDT) a UTC−4.";
itData.explanation_dynamic = "Per convertire l'ora tra {from} e {to} occorre considerare gli scarti orari attivi di entrambe le aree geografiche. A seconda del periodo dell'anno, una o entrambe le zone possono applicare l'ora legale, modificando la differenza effettiva. In particolare, {from} fa riferimento alla zona IANA {fromZone} e {to} alla zona IANA {toZone}. Utilizza il calcolatore in alto per determinare la corrispondenza esatta per qualsiasi data del calendario.";

itData.useCases_difference = {
  title: "Scenari di confronto",
  items: [
    {
      title: "Pianificazione strategica annuale",
      text: "Valuta le finestre di passaggio all'ora legale prima di fissare scadenze ed eventi internazionali ricorrenti."
    },
    {
      title: "Accordi legali e contratti",
      text: "Verifica le definizioni di orario standard citate in contratti transatlantici, accordi di servizio e clausole commerciali."
    },
    {
      title: "Coordinamento operativo",
      text: "Confronta l'ora civile di New York con le zone a riferimento fisso UTC+0 per una sincronizzazione senza sorprese."
    }
  ]
};

itData.useCases_reverse = {
  title: "Casi d'uso per la conversione inversa",
  items: [
    {
      title: "Analisi dei log di sistema",
      text: "Converti timestamp registrati negli orari locali statunitensi (EST/EDT) nel riferimento universale UTC/GMT per audit e analisi."
    },
    {
      title: "Trasmissioni e dirette internazionali",
      text: "Coordina il lancio di live streaming e webinar dalla costa est verso il pubblico europeo e globale."
    },
    {
      title: "Viaggi e navigazione",
      text: "Allinea orari di imbarco, partenze aeree e biglietti intercontinentali basati su scarti orari GMT standardizzati."
    }
  ]
};

itData.useCases_guide = {
  title: "Ambiti applicativi della misurazione del tempo",
  items: [
    {
      title: "Contesto storico e marittimo",
      text: "Scopri le origini degli standard del meridiano di Greenwich e il loro ruolo nella navigazione e nel commercio mondiale."
    },
    {
      title: "Ricerca scientifica e aerospaziale",
      text: "Comprendi perché laboratori, telecomunicazioni e missioni spaziali impiegano lo standard atomico UTC."
    },
    {
      title: "Ingegneria del software",
      text: "Padroneggia la gestione dei formati ISO 8601, timestamp Unix ed epoche per database resilienti ai cambi di fuso."
    }
  ]
};

itData.useCases_dynamic = [
  {
    title: "Collaborazione da remoto tra {from} e {to}",
    text: "Organizza videochiamate, meeting periodici e allineamenti di progetto tra {from} e {to}."
  },
  {
    title: "Viaggi e logistica tra {from} e {to}",
    text: "Converti orari di volo, coincidenze e arrivi aeroportuali tra {from} e {to}."
  },
  {
    title: "Eventi e webinar in diretta",
    text: "Pubblica gli orari ufficiali di tornei online, streaming e presentazioni condivise tra {from} e {to}."
  }
];

itData.topics_difference = {
  title: "Differenze chiave e variazioni stagionali",
  items: [
    {
      title: "Ora solare vs ora legale",
      text: "Il GMT è un riferimento costante a UTC+0, mentre l'Eastern Time passa ciclicamente da EST (UTC−5) in inverno a EDT (UTC−4) in estate."
    },
    {
      title: "Lo scarto di 4 ore contro lo scarto di 5 ore",
      text: "La differenza oraria effettiva tra Greenwich e la costa orientale è di 5 ore nei mesi invernali e si riduce a 4 ore nei mesi estivi."
    },
    {
      title: "Calendario dei passaggi all'ora legale negli USA",
      text: "Negli Stati Uniti l'ora legale entra in vigore la seconda domenica di marzo e si conclude la prima domenica di novembre."
    }
  ]
};

itData.topics_reverse = {
  title: "Consigli per la conversione da Eastern Time a GMT",
  items: [
    {
      title: "Aggiungere le ore per ottenere il GMT",
      text: "Poiché l'Eastern Time è indietro rispetto a GMT, occorre aggiungere ore (5 ore in inverno, 4 ore in estate) per ottenere l'ora GMT corrispondente."
    },
    {
      title: "Evitare l'errore comune su EST ed EDT",
      text: "Non presumere che l'Eastern Time sia sempre UTC−5: in estate l'adozione di EDT (UTC−4) modifica il calcolo effettivo di un'ora."
    },
    {
      title: "Sincronizzazione dei dati",
      text: "Salva i dati temporali e i timestamp in formato UTC/GMT nei database, convertendoli poi in ora locale Eastern nell'interfaccia utente."
    }
  ]
};

itData.topics_guide = {
  title: "Evoluzione e sistemi di misurazione del tempo",
  items: [
    {
      title: "Tempo astronomico vs tempo atomico",
      text: "Il GMT è legato al transito solare sul meridiano di Greenwich, mentre l'UTC è regolato con precisione nanometrica da orologi atomici al cesio."
    },
    {
      title: "Standard militari e aeronautici",
      text: "Nel settore militare e nell'aviazione si impiega il formato orario a 24 ore, identificando il fuso di riferimento GMT/UTC con la lettera 'Z' (Zulu Time)."
    },
    {
      title: "La nascita dei fusi orari standard",
      text: "I fusi orari uniformi furono introdotti alla fine del XIX secolo per rispondere alle esigenze di coordinamento delle reti ferroviarie internazionali."
    }
  ]
};

itData.topics_dynamic = [
  {
    title: "Scarto di base tra {from} e {to}",
    text: "Comprendere la differenza oraria standard tra i fusi {from} e {to}."
  },
  {
    title: "Impatto dell'ora legale in {from} o {to}",
    text: "Come le transizioni stagionali estive modificano l'intervallo orario tra {from} e {to}."
  },
  {
    title: "Pianificazione e gestione del cambio di data",
    text: "Strategie di coordinamento per evitare errori dovuti al passaggio della mezzanotte tra {from} e {to}."
  }
];

itData.faqs_difference = {
  title: "Domande frequenti : Differenza tra GMT ed EST",
  items: [
    {
      q: "Perché la differenza tra GMT ed Eastern Time cambia durante l'anno?",
      a: "Il GMT rimane costante a UTC+0 tutto l'anno, mentre la maggior parte della costa orientale statunitense passa da EST a EDT in estate per l'ora legale. Questo passaggio riduce la differenza oraria da 5 ore a 4 ore."
    },
    {
      q: "È più corretto dire EST oppure Eastern Time?",
      a: "Eastern Time (ET) è la dicitura più corretta durante tutto l'anno, perché include sia EST (inverno) che EDT (estate). È preferibile usare EST solo quando è specificamente in vigore l'ora solare standard."
    },
    {
      q: "GMT è sempre avanti rispetto all'Eastern Time?",
      a: "Sì. Il GMT è sempre 5 ore avanti rispetto a EST e 4 ore avanti rispetto a EDT."
    },
    {
      q: "Il GMT adotta l'ora legale?",
      a: "No. Il GMT è un riferimento fisso a UTC+0 e non cambia mai con le stagioni. Il Regno Unito adotta l'ora legale britannica (BST, UTC+1), non il GMT, durante il periodo estivo."
    }
  ]
};

itData.faqs_reverse = {
  title: "Domande frequenti : Conversione da EST a GMT",
  items: [
    {
      q: "Come si converte l'ora EST o EDT in GMT?",
      a: "Aggiungi 5 ore all'orario EST (inverno) oppure aggiungi 4 ore all'orario EDT (estate) per ottenere l'ora GMT corrispondente."
    },
    {
      q: "L'Eastern Time è indietro rispetto a GMT?",
      a: "Sì. L'Eastern Time si trova a ovest rispetto a Greenwich, quindi il suo orario è sempre indietro rispetto a GMT."
    },
    {
      q: "Qual è l'errore più comune nella conversione da Eastern a GMT?",
      a: "Dimenticare che la costa orientale adotta l'ora legale (EDT) da marzo a novembre, applicando erroneamente uno scarto di 5 ore anziché di 4 ore."
    },
    {
      q: "Perché gli sviluppatori convertono gli eventi in ora Eastern verso GMT?",
      a: "GMT/UTC è lo standard universale per database, server e registri di log, garantendo un ordinamento cronologico univoco indipendentemente dalla posizione geografica degli utenti."
    }
  ]
};

itData.faqs_guide = {
  title: "Domande frequenti su fusi orari e misurazione del tempo",
  items: [
    {
      q: "Qual è la differenza tra GMT e UTC?",
      a: "Il GMT è un fuso orario civile storico basato sul tempo solare medio a Greenwich, mentre l'UTC è uno standard scientifico atomico. Ai fini civili condividono lo stesso scarto (UTC+0)."
    },
    {
      q: "Cosa significa scarto UTC (UTC offset)?",
      a: "Lo scarto UTC indica la differenza in ore e minuti tra l'ora locale di una data località e il Tempo Coordinato Universale (UTC)."
    },
    {
      q: "Perché è stata introdotta l'ora legale (DST)?",
      a: "L'ora legale è stata introdotta per sfruttare meglio la luce naturale serale nei mesi estivi e ridurre il consumo energetico per l'illuminazione."
    },
    {
      q: "Cos'è l'orario a 24 ore (ora militare)?",
      a: "L'orario a 24 ore è un sistema di notazione che conta le ore da 00:00 a 23:59, eliminando i suffissi AM e PM per prevenire qualsiasi ambiguità nelle comunicazioni."
    }
  ]
};

itData.faqs_dynamic = [
  {
    q: "Come si converte l'ora tra {from} e {to}?",
    a: "Seleziona data e ora nei campi in alto per ottenere all'istante la conversione esatta tra {from} e {to} con calcolo automatico dell'ora legale."
  },
  {
    q: "La differenza di fuso orario tra {from} e {to} può variare?",
    a: "Sì. Se una delle due zone geografiche applica l'ora legale estiva, il divario orario si adatta automaticamente in base al calendario."
  },
  {
    q: "Quali sono i fusi orari di riferimento per {from} e {to}?",
    a: "La zona IANA di riferimento per {from} è {fromZone}, mentre per {to} è {toZone}."
  }
];

itData.conclusion_home = "In sintesi, per convertire l'ora GMT in EST è necessario sottrarre 5 ore in inverno (EST) o 4 ore in estate (EDT). Utilizza i nostri orologi in tempo reale e la tabella di conversione a 24 ore per una precisione assoluta.";
itData.cta_home = "Utilizza il selettore orario in alto per verificare l'ora esatta e pianificare le tue conversioni in tempo reale.";
itData.conclusion_difference = "Comprendere a fondo la differenza tra GMT ed Eastern Time è fondamentale per organizzare appuntamenti senza errori. Verifica sempre la data del calendario per applicare lo scarto esatto.";
itData.cta_difference = "Confronta gli scarti tra GMT ed EST in alto per sincronizzare le tue riunioni di lavoro.";
itData.conclusion_reverse = "Riconvertire l'orario EST o EDT in GMT è semplice se ricordi di sommare lo scarto attivo (5 ore in inverno, 4 ore in estate). Salva questa pagina tra i preferiti per calcoli rapidi.";
itData.cta_reverse = "Converti l'Eastern Time in GMT utilizzando il calcolatore inverso in alto.";
itData.conclusion_guide = "Gli standard orari globali come GMT e UTC garantiscono la sincronizzazione del mondo moderno. Conoscere queste nozioni previene incomprensioni e imprecisioni nei registri tecnici.";
itData.cta_guide = "Approfondisci le nostre guide pratiche in basso per padroneggiare i fusi orari mondiali.";
itData.conclusion_dynamic = "Le differenze orarie tra {from} e {to} sono soggette a regole stagionali. Utilizza sempre un convertitore basato sulla data per confermare riunioni e itinerari di viaggio.";
itData.cta_dynamic = "Utilizza il convertitore da {from} a {to} in alto per pianificare i tuoi orari.";

fs.writeFileSync(itJsonPath, JSON.stringify(itData, null, 2), 'utf8');
console.log('Successfully updated it.json with 100% complete keys!');
