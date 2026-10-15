'use client';

import React from 'react';
import Link from 'next/link';
import { SectionEyebrow } from './shared/section-eyebrow';
import { SectionHeading } from './shared/section-heading';
import { Reveal } from './shared/reveal';
import { ShieldCheck, Zap, Layers, WifiOff, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type SupportedLocale = 'hi' | 'ta' | 'es' | 'de' | 'fr' | 'pt' | 'id' | 'ja';

interface LocalizedContent {
  features: {
    eyebrow: string;
    heading: string;
    subheading: string;
    items: Array<{
      number: string;
      title: string;
      description: string;
      statValue: string;
      statLabel: string;
    }>;
  };
  process: {
    eyebrow: string;
    titleLines: [string, string, string];
    steps: Array<{
      number: string;
      title: string;
      subtitle: string;
      description: string;
    }>;
  };
  architecture: {
    eyebrow: string;
    heading: string;
    subheading: string;
    description: string;
    badges: string[];
  };
  cta: {
    heading: string;
    subheading: string;
    buttonText: string;
  };
}

const LOCALIZED_DATA: Record<SupportedLocale, LocalizedContent> = {
  hi: {
    features: {
      eyebrow: 'iCreatePDF क्यों चुनें',
      heading: 'गति के लिए निर्मित,',
      subheading: 'पूर्ण गोपनीयता के साथ।',
      items: [
        {
          number: '01',
          title: 'बिजली जैसी तेज़ गति',
          description: 'कोई कतार या सर्वर इंतज़ार नहीं। आपका कंप्यूटर दस्तावेज़ों को सीधे ब्राउज़र मेमोरी में संसाधित करता है।',
          statValue: '< 10ms',
          statLabel: 'प्रोसेसिंग गति',
        },
        {
          number: '02',
          title: '100% गोपनीयता की गारंटी',
          description: 'आपके अनुबंध, बैंक विवरण और निजी फाइलें कभी आपके डिवाइस से बाहर नहीं जातीं।',
          statValue: '0.0 MB',
          statLabel: 'क्लाउड पर भेजा गया',
        },
        {
          number: '03',
          title: 'सभी 70+ टूल्स एक ही स्थान पर',
          description: 'पीडीएफ मर्ज, स्प्लिट, कंप्रेस, साइन और कन्वर्ट करने के लिए 70 से अधिक मुफ़्त टूल्स — बिना किसी सब्सक्रिप्शन के।',
          statValue: '70+',
          statLabel: 'मुफ़्त टूल्स',
        },
        {
          number: '04',
          title: 'ऑफ़लाइन भी काम करता है',
          description: 'एक बार पेज लोड होने के बाद बिना सक्रिय इंटरनेट कनेक्शन के भी सभी टूल्स पूरी तरह काम करते हैं।',
          statValue: '100%',
          statLabel: 'ऑफ़लाइन सक्षम',
        },
      ],
    },
    process: {
      eyebrow: 'सरल कार्यप्रणाली',
      titleLines: ['चुनें.', 'प्रोसेस करें.', 'डाउनलोड करें.'],
      steps: [
        {
          number: '01',
          title: 'अपना टूल चुनें',
          subtitle: 'अपनी आवश्यकतानुसार',
          description: '70+ टूल्स में से अपनी पसंद का टूल चुनें — पीडीएफ मर्ज करना हो, फाइल साइज छोटा करना हो या फोटो कन्वर्ट करना हो।',
        },
        {
          number: '02',
          title: 'अपनी फाइलें जोड़ें',
          subtitle: 'ड्रैग और ड्रॉप करें',
          description: 'फाइलों को ड्रॉप करें या अपने डिवाइस से चुनें। आपकी फाइलें सुरक्षित रूप से ब्राउज़र मेमोरी में ही रहती हैं।',
        },
        {
          number: '03',
          title: 'डाउनलोड करें और तैयार',
          subtitle: 'तुरंत परिणाम',
          description: 'आवश्यक बदलाव करें और अपना नया दस्तावेज़ बिना किसी वॉटरमार्क के तुरंत डाउनलोड करें।',
        },
      ],
    },
    architecture: {
      eyebrow: 'क्लाइंट-साइड आर्किटेक्चर',
      heading: 'सर्वरलेस डिज़ाइन द्वारा',
      subheading: 'सर्वोच्च डेटा सुरक्षा।',
      description: 'पारंपरिक ऑनलाइन कन्वर्टर्स के विपरीत जो आपकी निजी फाइलें दूरस्थ सर्वर पर अपलोड करते हैं, iCreatePDF WebAssembly (Wasm) और स्थानीय जावास्क्रिप्ट के माध्यम से आपके डिवाइस मेमोरी में सब कुछ निष्पादित करता है। कोई नेटवर्क ट्रैफ़िक नहीं, कोई सर्वर लॉग नहीं।',
      badges: ['शून्य सर्वर अपलोड', 'स्थानीय WebAssembly निष्पादन', 'GDPR और HIPAA अनुकूल', 'पूर्ण ऑफ़लाइन कार्यक्षमता'],
    },
    cta: {
      heading: 'सुरक्षित रूप से शुरू करने के लिए तैयार हैं?',
      subheading: 'बिना किसी पंजीकरण या शुल्क के, आज ही अपनी पीडीएफ फाइलों को 100% निजी रूप से प्रोसेस करें।',
      buttonText: 'ऊपर टूल्स देखें ↑',
    },
  },
  ta: {
    features: {
      eyebrow: 'iCreatePDF ஐ ஏன் தேர்வு செய்ய வேண்டும்?',
      heading: 'மின்னல் வேகம்,',
      subheading: 'முழுமையான தனியுரிமை.',
      items: [
        {
          number: '01',
          title: 'மின்னல் வேக முடிவுகள்',
          description: 'நீண்ட பதிவேற்ற காத்திருப்பு இல்லை. உங்கள் கணினியே உங்கள் உலாவியில் நேரடியாக கோப்புகளைச் செயலாக்குகிறது.',
          statValue: '< 10ms',
          statLabel: 'செயலாக்க வேகம்',
        },
        {
          number: '02',
          title: 'முழுமையான தனியுரிமை உத்தரவாதம்',
          description: 'உங்கள் ரகசிய ஒப்பந்தங்கள் மற்றும் தனிப்பட்ட ஆவணங்கள் உங்கள் சாதனத்திலேயே இருக்கும். நாங்கள் சேமிப்பதில்லை.',
          statValue: '0.0 MB',
          statLabel: 'கிளவுடுக்கு அனுப்பப்பட்டது',
        },
        {
          number: '03',
          title: 'அனைத்தும் ஒரே இடத்தில்',
          description: 'PDFகளை ஒன்றிணைக்க, சுருக்க, கையொப்பமிட மற்றும் மாற்ற 70க்கும் மேற்பட்ட இலவசக் கருவிகள் — கட்டணம் ஏதுமில்லை.',
          statValue: '70+',
          statLabel: 'இலவசக் கருவிகள்',
        },
        {
          number: '04',
          title: 'ஆஃப்லைனிலும் இயங்கும்',
          description: 'பக்கம் ஏற்றப்பட்டதும் இணைய இணைப்பு இல்லாமலும் எங்கள் கருவிகள் தடையின்றி வேலை செய்யும்.',
          statValue: '100%',
          statLabel: 'ஆஃப்லைன் தயார்',
        },
      ],
    },
    process: {
      eyebrow: 'செயல்முறை',
      titleLines: ['தேர்ந்தெடுங்கள்.', 'செயலாக்குங்கள்.', 'பதிவிறக்குங்கள்.'],
      steps: [
        {
          number: '01',
          title: 'கருவியைத் தேர்ந்தெடுக்கவும்',
          subtitle: 'தேவையானதைத் தேர்வு செய்யுங்கள்',
          description: 'எங்கள் தொகுப்பிலிருந்து எந்தவொரு கருவியையும் தேர்ந்தெடுக்கவும் — அறிக்கைகளை இணைக்கவோ அல்லது PDF சுருக்கவோ.',
        },
        {
          number: '02',
          title: 'கோப்புகளைச் சேர்க்கவும்',
          subtitle: 'இழுத்து விடவும்',
          description: 'உங்கள் கோப்புகளைத் தேர்ந்தெடுக்கவும். அனைத்தும் உங்கள் உலாவியில் பாதுகாப்பாக இருக்கும், கிளவுடுக்கு செல்லாது.',
        },
        {
          number: '03',
          title: 'பதிவிறக்கி முடிக்கவும்',
          subtitle: 'நொடிகளில் தயார்',
          description: 'விரைவான மாற்றங்களைச் செய்து உங்கள் புதிய கோப்பை வாட்டர்மார்க் இல்லாமல் உடனடியாகப் பதிவிறக்கவும்.',
        },
      ],
    },
    architecture: {
      eyebrow: 'கிளையன்ட்-சைட் கட்டமைப்பு',
      heading: 'சேவையகமற்ற வடிவமைப்பு —',
      subheading: 'நம்பகமான பாதுகாப்பு.',
      description: 'உங்கள் ஆவணங்களை தொலை சேவையகங்களுக்கு பதிவேற்றும் வழக்கமான தளங்கள் போலல்லாமல், iCreatePDF உங்கள் உலாவி நினைவகத்திலேயே WebAssembly தொழில்நுட்பம் மூலம் பாதுகாப்பாக இயக்குகிறது. பூஜ்ஜிய தரவு பரிமாற்றம்.',
      badges: ['பூஜ்ஜிய சர்வர் பதிவேற்றம்', 'உள்ளூர் WebAssembly செயலாக்கம்', 'GDPR பாதுகாப்பு தரநிலைகள்', '100% ஆஃப்லைன் வசதி'],
    },
    cta: {
      heading: 'தொடங்க தயாரா?',
      subheading: 'இன்றே உங்கள் PDF ஆவணங்களை பாதுகாப்பாக மற்றும் இலவசமாக செயலாக்கத் தொடங்குங்கள்.',
      buttonText: 'கருவிகளை ஆராயுங்கள் ↑',
    },
  },
  es: {
    features: {
      eyebrow: '¿Por Qué Elegir iCreatePDF?',
      heading: 'Diseñado para la velocidad,',
      subheading: 'creado para la privacidad.',
      items: [
        {
          number: '01',
          title: 'Resultados Ultrarrápidos',
          description: 'Sin colas ni esperas en servidores. Su navegador procesa los documentos directamente en memoria en cuestión de segundos.',
          statValue: '< 10ms',
          statLabel: 'Velocidad de Proceso',
        },
        {
          number: '02',
          title: 'Privacidad Total Garantizada',
          description: 'Sus archivos y contratos confidenciales nunca salen de su dispositivo. Jamás vemos ni almacenamos sus datos.',
          statValue: '0.0 MB',
          statLabel: 'Enviados a la Nube',
        },
        {
          number: '03',
          title: 'Todo en un Solo Lugar',
          description: 'Más de 70 utilidades gratuitas para unir, comprimir, organizar, firmar y proteger sus PDFs sin muros de pago.',
          statValue: '70+',
          statLabel: 'Herramientas Libres',
        },
        {
          number: '04',
          title: 'Funciona Incluso Sin Conexión',
          description: 'Una vez cargada la página, nuestras herramientas funcionan perfectamente sin conexión activa a internet.',
          statValue: '100%',
          statLabel: 'Listo Offline',
        },
      ],
    },
    process: {
      eyebrow: 'Flujo de Trabajo',
      titleLines: ['Selecciona.', 'Procesa.', 'Descarga.'],
      steps: [
        {
          number: '01',
          title: 'Elija su Herramienta',
          subtitle: 'lo que necesite',
          description: 'Seleccione cualquier herramienta de nuestra colección: unir informes, comprimir documentos pesados o convertir fotos.',
        },
        {
          number: '02',
          title: 'Agregue sus Archivos',
          subtitle: 'arrastrar y soltar',
          description: 'Suelte sus archivos o selecciónelos desde su dispositivo. Todo se procesa localmente en su memoria.',
        },
        {
          number: '03',
          title: 'Descargue y Listo',
          subtitle: 'listo en segundos',
          description: 'Realice ajustes rápidos y guarde su nuevo archivo listo para descargar al instante sin marcas de agua.',
        },
      ],
    },
    architecture: {
      eyebrow: 'Arquitectura del Lado del Cliente',
      heading: 'Diseño Sin Servidores por Naturaleza —',
      subheading: 'Privacidad Inquebrantable.',
      description: 'A diferencia de los convertidores tradicionales que envían sus archivos a servidores remotos en la nube, iCreatePDF procesa todo en la memoria de su navegador mediante WebAssembly y motores locales de JavaScript.',
      badges: ['Cero Carga a Servidores', 'Ejecución WebAssembly Local', 'Conforme a GDPR y Privacidad', 'Operación 100% Offline'],
    },
    cta: {
      heading: '¿Listo para comenzar a procesar?',
      subheading: 'Comience a convertir, unir y editar sus archivos PDF de forma 100% privada y gratuita hoy mismo.',
      buttonText: 'Explorar Herramientas ↑',
    },
  },
  de: {
    features: {
      eyebrow: 'Warum iCreatePDF wählen?',
      heading: 'Entwickelt für Geschwindigkeit,',
      subheading: 'gebaut für maximale Privatsphäre.',
      items: [
        {
          number: '01',
          title: 'Blitzschnelle Ergebnisse',
          description: 'Keine langen Warteschlangen. Ihr Computer verarbeitet Dokumente direkt im Browser.',
          statValue: '< 10ms',
          statLabel: 'Verarbeitungszeit',
        },
        {
          number: '02',
          title: 'Garantierte Privatsphäre',
          description: 'Ihre vertraulichen Verträge und Dokumente bleiben auf Ihrem Gerät. Keine Cloud-Speicherung.',
          statValue: '0.0 MB',
          statLabel: 'Cloud-Upload',
        },
        {
          number: '03',
          title: 'Alles an einem Ort',
          description: 'Zugriff auf über 70 kostenlose Werkzeuge zum Zusammenfügen, Komprimieren und Konvertieren.',
          statValue: '70+',
          statLabel: 'Gratis Tools',
        },
        {
          number: '04',
          title: 'Funktioniert auch offline',
          description: 'Einmal geladen, funktionieren alle Tools ohne aktive Internetverbindung.',
          statValue: '100%',
          statLabel: 'Offline-Bereit',
        },
      ],
    },
    process: {
      eyebrow: 'Ablauf',
      titleLines: ['Auswählen.', 'Verarbeiten.', 'Herunterladen.'],
      steps: [
        {
          number: '01',
          title: 'Werkzeug wählen',
          subtitle: 'nach Bedarf',
          description: 'Wählen Sie das passende Tool aus unserer Sammlung — Zusammenfügen, Komprimieren oder Konvertieren.',
        },
        {
          number: '02',
          title: 'Dateien hinzufügen',
          subtitle: 'Drag & Drop',
          description: 'Legen Sie Ihre Dokumente ab. Alles bleibt sicher in Ihrem Browser-Speicher.',
        },
        {
          number: '03',
          title: 'Fertig herunterladen',
          subtitle: 'sofort bereit',
          description: 'Speichern Sie Ihre Datei sofort ohne Wasserzeichen oder Wartezeiten.',
        },
      ],
    },
    architecture: {
      eyebrow: 'Client-Side Architektur',
      heading: 'Serverlos nach Design —',
      subheading: 'Konsequent DSGVO-konform.',
      description: 'Im Gegensatz zu herkömmlichen Diensten verarbeitet iCreatePDF alle Dokumente via WebAssembly direkt in Ihrem Browser.',
      badges: ['Null Server-Uploads', 'WebAssembly Speicher-Sandbox', 'DSGVO-konform', '100% Offline-fähig'],
    },
    cta: {
      heading: 'Bereit loszulegen?',
      subheading: 'Verarbeiten Sie Ihre Dokumente ab sofort absolut privat und kostenlos.',
      buttonText: 'Zu den Werkzeugen ↑',
    },
  },
  fr: {
    features: {
      eyebrow: 'Pourquoi choisir iCreatePDF ?',
      heading: 'Conçu pour la vitesse,',
      subheading: 'pensé pour la confidentialité.',
      items: [
        {
          number: '01',
          title: 'Résultats Ultra-Rapides',
          description: 'Pas de file d’attente. Votre ordinateur traite vos fichiers directement dans votre navigateur.',
          statValue: '< 10ms',
          statLabel: 'Vitesse de Traitement',
        },
        {
          number: '02',
          title: 'Confidentialité Totale',
          description: 'Vos contrats et fichiers sensibles ne quittent jamais votre machine. Zéro stockage externe.',
          statValue: '0.0 Mo',
          statLabel: 'Envoyé au Cloud',
        },
        {
          number: '03',
          title: 'Tout au même endroit',
          description: 'Plus de 70 outils gratuits pour fusionner, compresser, signer et convertir vos PDF sans abonnement.',
          statValue: '70+',
          statLabel: 'Outils Gratuits',
        },
        {
          number: '04',
          title: 'Fonctionne Hors Ligne',
          description: 'Une fois la page chargée, nos outils fonctionnent sans connexion internet active.',
          statValue: '100%',
          statLabel: 'Prêt Hors Ligne',
        },
      ],
    },
    process: {
      eyebrow: 'Procédure',
      titleLines: ['Choisir.', 'Traiter.', 'Télécharger.'],
      steps: [
        {
          number: '01',
          title: 'Choisissez votre outil',
          subtitle: 'selon vos besoins',
          description: 'Sélectionnez un outil pour fusionner, compresser ou convertir vos photos et fichiers.',
        },
        {
          number: '02',
          title: 'Ajoutez vos documents',
          subtitle: 'glisser-déposer',
          description: 'Glissez vos fichiers dans le navigateur. Tout reste confiné dans votre mémoire locale.',
        },
        {
          number: '03',
          title: 'Téléchargez immédiatement',
          subtitle: 'en quelques secondes',
          description: 'Téléchargez votre document finalisé sans aucun filigrane.',
        },
      ],
    },
    architecture: {
      eyebrow: 'Architecture Côté Client',
      heading: 'Sans Serveur par Conception —',
      subheading: 'Sécurité Maximale.',
      description: 'iCreatePDF exécute l’ensemble des opérations dans votre mémoire locale grâce à WebAssembly et JavaScript.',
      badges: ['Zéro Transfert Serveur', 'Exécution WebAssembly Locale', 'Conforme RGPD', 'Mode Hors Ligne'],
    },
    cta: {
      heading: 'Prêt à commencer ?',
      subheading: 'Commencez à gérer vos fichiers PDF en toute sécurité et sans frais dès aujourd’hui.',
      buttonText: 'Voir les Outils ↑',
    },
  },
  pt: {
    features: {
      eyebrow: 'Por que escolher o iCreatePDF?',
      heading: 'Projetado para velocidade,',
      subheading: 'construído para total privacidade.',
      items: [
        {
          number: '01',
          title: 'Resultados Ultrarrápidos',
          description: 'Sem filas de upload. Seu computador processa os documentos diretamente no navegador.',
          statValue: '< 10ms',
          statLabel: 'Velocidade',
        },
        {
          number: '02',
          title: 'Privacidade Garantida',
          description: 'Seus arquivos confidenciais ficam no seu dispositivo. Nunca salvamos seus dados.',
          statValue: '0.0 MB',
          statLabel: 'Enviado à Nuvem',
        },
        {
          number: '03',
          title: 'Tudo em um Só Lugar',
          description: 'Mais de 70 ferramentas gratuitas para juntar, comprimir, assinar e converter PDFs sem limites.',
          statValue: '70+',
          statLabel: 'Ferramentas Grátis',
        },
        {
          number: '04',
          title: 'Funciona Offline',
          description: 'Após o carregamento da página, as ferramentas funcionam perfeitamente sem internet.',
          statValue: '100%',
          statLabel: 'Pronto Offline',
        },
      ],
    },
    process: {
      eyebrow: 'Processo',
      titleLines: ['Escolher.', 'Processar.', 'Baixar.'],
      steps: [
        {
          number: '01',
          title: 'Escolha a Ferramenta',
          subtitle: 'o que você precisa',
          description: 'Selecione qualquer ferramenta para juntar, comprimir ou converter arquivos.',
        },
        {
          number: '02',
          title: 'Adicione seus Arquivos',
          subtitle: 'arrastar e soltar',
          description: 'Solte seus arquivos no navegador. Nada é enviado para servidores externos.',
        },
        {
          number: '03',
          title: 'Baixe na Hora',
          subtitle: 'pronto em segundos',
          description: 'Salve o seu novo documento instantaneamente e sem marcas d’água.',
        },
      ],
    },
    architecture: {
      eyebrow: 'Arquitetura Client-Side',
      heading: 'Sem Servidores por Design —',
      subheading: 'Privacidade Absoluta.',
      description: 'O iCreatePDF executa todas as operações localmente no seu dispositivo via WebAssembly e JavaScript.',
      badges: ['Zero Uploads Externos', 'Execução WebAssembly Local', 'Conforme LGPD & GDPR', '100% Offline'],
    },
    cta: {
      heading: 'Pronto para começar?',
      subheading: 'Processe seus documentos com total privacidade e sem custos hoje mesmo.',
      buttonText: 'Ver Ferramentas ↑',
    },
  },
  id: {
    features: {
      eyebrow: 'Mengapa Memilih iCreatePDF?',
      heading: 'Dibuat untuk Kecepatan,',
      subheading: 'Dirancang untuk Privasi Penuh.',
      items: [
        {
          number: '01',
          title: 'Hasil Super Cepat',
          description: 'Tanpa antrean upload. Komputer Anda memproses dokumen langsung di memori browser.',
          statValue: '< 10ms',
          statLabel: 'Kecepatan Proses',
        },
        {
          number: '02',
          title: 'Privasi Terjamin 100%',
          description: 'Dokumen rahasia Anda tetap di perangkat Anda. Kami tidak pernah melihat atau menyimpan data Anda.',
          statValue: '0.0 MB',
          statLabel: 'Dikirim ke Cloud',
        },
        {
          number: '03',
          title: 'Semua dalam Satu Tempat',
          description: 'Akses lebih dari 70 alat gratis untuk menggabungkan, mengompres, dan mengubah PDF tanpa batasan.',
          statValue: '70+',
          statLabel: 'Alat Gratis',
        },
        {
          number: '04',
          title: 'Bisa Digunakan Offline',
          description: 'Setelah halaman dimuat, semua alat dapat digunakan tanpa koneksi internet aktif.',
          statValue: '100%',
          statLabel: 'Siap Offline',
        },
      ],
    },
    process: {
      eyebrow: 'Cara Kerja',
      titleLines: ['Pilih.', 'Proses.', 'Unduh.'],
      steps: [
        {
          number: '01',
          title: 'Pilih Alat',
          subtitle: 'sesuai kebutuhan',
          description: 'Pilih alat apa pun untuk menggabungkan laporan, mengecilkan ukuran PDF, atau konversi foto.',
        },
        {
          number: '02',
          title: 'Masukkan Berkas',
          subtitle: 'tarik & lepas',
          description: 'Tarik file Anda ke browser. Berkas tidak pernah dikirim ke server luar.',
        },
        {
          number: '03',
          title: 'Unduh Selesai',
          subtitle: 'siap dalam hitungan detik',
          description: 'Simpan file baru Anda tanpa tanda air (watermark) secara instan.',
        },
      ],
    },
    architecture: {
      eyebrow: 'Arsitektur Client-Side',
      heading: 'Tanpa Server Sejak Awal —',
      subheading: 'Keamanan Data Mutlak.',
      description: 'iCreatePDF menjalankan seluruh pemrosesan di memori lokal browser Anda menggunakan WebAssembly.',
      badges: ['Nol Upload ke Server', 'Eksekusi WebAssembly Lokal', 'Sesuai Standar Privasi', '100% Dukungan Offline'],
    },
    cta: {
      heading: 'Siap untuk memulai?',
      subheading: 'Mulai kelola berkas PDF Anda secara pribadi dan gratis sekarang juga.',
      buttonText: 'Lihat Semua Alat ↑',
    },
  },
  ja: {
    features: {
      eyebrow: 'iCreatePDFを選ぶ理由',
      heading: '圧倒的な処理速度と、',
      subheading: '完全なプライバシーの保護。',
      items: [
        {
          number: '01',
          title: '超高速なローカル処理',
          description: 'サーバーへのアップロード待ちはありません。ブラウザのローカルメモリ内で即座に処理が完了します。',
          statValue: '< 10ms',
          statLabel: '処理速度',
        },
        {
          number: '02',
          title: '100%のプライバシー保護',
          description: '機密文書や個人データはお使いの端末から外部に送信されません。サーバー保存ゼロ。',
          statValue: '0.0 MB',
          statLabel: 'クラウド送信量',
        },
        {
          number: '03',
          title: '70種類以上のツールを網羅',
          description: '結合、分割、圧縮、電子署名、変換など70以上のPDFツールが完全無料で利用可能です。',
          statValue: '70+',
          statLabel: '無料ツール数',
        },
        {
          number: '04',
          title: 'オフラインでも動作可能',
          description: '一度ページを読み込めば、インターネット接続が途切れても安全に作業を継続できます。',
          statValue: '100%',
          statLabel: 'オフライン対応',
        },
      ],
    },
    process: {
      eyebrow: 'ご利用の流れ',
      titleLines: ['選ぶ.', '処理する.', '保存する.'],
      steps: [
        {
          number: '01',
          title: 'ツールを選択',
          subtitle: '必要な機能を選ぶ',
          description: '結合、圧縮、画像変換など、目的に合った最適なツールを選択します。',
        },
        {
          number: '02',
          title: 'ファイルを追加',
          subtitle: 'ドラッグ＆ドロップ',
          description: 'ファイルを画面上にドロップ。端末内でのみ安全に展開されます。',
        },
        {
          number: '03',
          title: 'ダウンロードして完了',
          subtitle: '瞬時に完了',
          description: '透かし（ウォーターマーク）なしで、高画質の完成ファイルを即座に保存できます。',
        },
      ],
    },
    architecture: {
      eyebrow: 'クライアントサイド・アーキテクチャ',
      heading: 'サーバーレス設計による、',
      subheading: '確かなプライバシー。',
      description: '文書をクラウドに転送する一般的なオンラインツールとは異なり、iCreatePDFはWebAssembly（Wasm）を用いてブラウザ内部で安全に実行します。',
      badges: ['サーバーアップロードなし', 'WebAssemblyローカル実行', 'プライバシー保護設計', '完全オフライン動作'],
    },
    cta: {
      heading: '今すぐ無料で使ってみる',
      subheading: '登録不要・利用制限なし。プライバシーを最優先にした安全なPDF処理を体験してください。',
      buttonText: 'ツール一覧へ戻る ↑',
    },
  },
};

export function LocalizedLandingSections({ locale }: { locale: SupportedLocale }) {
  const content = LOCALIZED_DATA[locale] || LOCALIZED_DATA.es;

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 lg:space-y-32">
      {/* 1. Features Section */}
      <section className="relative py-24 bg-card/20 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <SectionEyebrow className="mb-6">{content.features.eyebrow}</SectionEyebrow>
            <Reveal>
              <SectionHeading>
                {content.features.heading} <br />
                <span className="text-muted-foreground">{content.features.subheading}</span>
              </SectionHeading>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.features.items.map((item, idx) => (
              <Reveal key={item.number} delay={idx * 50}>
                <div className="p-8 rounded-2xl bg-card/60 border border-border flex flex-col justify-between h-full space-y-6 hover:border-brand/40 transition-colors">
                  <div className="space-y-4">
                    <span className="font-mono text-xs text-muted-foreground">{item.number}</span>
                    <h3 className="text-xl font-display font-medium text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-sans">{item.description}</p>
                  </div>
                  <div className="pt-4 border-t border-border/50">
                    <span className="block text-2xl font-display font-bold text-foreground">{item.statValue}</span>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase">{item.statLabel}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Process Section */}
      <section className="relative py-24 bg-background border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <SectionEyebrow className="mb-6">{content.process.eyebrow}</SectionEyebrow>
            <Reveal>
              <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight">
                <span className="block text-foreground">{content.process.titleLines[0]}</span>
                <span className="block text-muted-foreground">{content.process.titleLines[1]}</span>
                <span className="block text-foreground/20">{content.process.titleLines[2]}</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {content.process.steps.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 50}>
                <div className="p-8 lg:p-10 rounded-2xl bg-card/40 border border-border space-y-4 hover:border-brand/40 transition-colors">
                  <span className="text-3xl font-display font-medium text-brand">{step.number}</span>
                  <div>
                    <h3 className="text-xl font-display font-medium text-foreground">{step.title}</h3>
                    <span className="text-xs font-mono text-muted-foreground">{step.subtitle}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed font-sans">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Architecture & Security Section */}
      <section className="relative py-24 bg-card/20 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <SectionEyebrow className="mb-6">{content.architecture.eyebrow}</SectionEyebrow>
            <Reveal>
              <SectionHeading>
                {content.architecture.heading} <br />
                <span className="text-muted-foreground">{content.architecture.subheading}</span>
              </SectionHeading>
            </Reveal>
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed font-sans">
              {content.architecture.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.architecture.badges.map((badge, idx) => (
              <Reveal key={idx} delay={idx * 40}>
                <div className="p-5 rounded-xl bg-card border border-border flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-xs font-medium text-foreground">{badge}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Localized CTA Section */}
      <section className="relative py-20 bg-gradient-to-b from-card/30 to-background border-t border-b border-border text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {content.cta.heading}
            </h2>
          </Reveal>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto">
            {content.cta.subheading}
          </p>
          <div className="pt-2">
            <Button
              onClick={scrollToTop}
              className="rounded-full px-8 py-6 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-brand/10 transition-all hover:scale-105"
            >
              {content.cta.buttonText}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
