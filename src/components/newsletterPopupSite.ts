import type { NewsletterPopupCopy } from '../shared/NewsletterPopup';

/**
 * laplandnightlife.com: uutiskirjepopupin oma teksti.
 *
 * Vesa 23.9.2026: "tekstit ja värimaailma sivustokohtaisiksi" → "kyllä, vie
 * kaikille". Kuva, lomake, nappi ja #LAPLAND-merkki pysyvät verkoston yhteisinä.
 * Teksti = sivun oma aihe lukijan näkökulmasta, 12 kielellä natiivina.
 * 🔴 Ei hälytyksiä, ei lähetystahtia, ei "ensimmäisenä" (9.8.2026 lupauspurku):
 * uutiskirje lähtee vain kun on kerrottavaa. Otsikko tulee jaetusta komponentista.
 */
export const POPUP_COPY: NewsletterPopupCopy = {
  en: {
    description: 'Founder of LaplandVibes. Gigs, clubs and long evenings in the fells. I tell you where to start a Lapland night and where it carries on.',
  },
  fi: {
    description: 'LaplandVibesin perustaja. Keikat, klubit ja pitkät tunturi-illat. Kerron, mistä Lapin yö kannattaa aloittaa ja minne se jatkuu.',
  },
  de: {
    description: 'Gründer von LaplandVibes. Livekonzerte, Clubs und die langen Abende in den Fjälls. Ich erzähle Ihnen, wo Sie in Lappland am besten in die Nacht starten und wohin es danach weitergeht.',
  },
  ja: {
    description: 'LaplandVibes創業者。ライブにクラブ、そしてフェルで過ごす長い夜。ラップランドの夜をどこから始めて、そのあとどこへ流れていくかをお話しします。',
  },
  es: {
    description: 'Fundador de LaplandVibes. Conciertos, discotecas y largas veladas en la montaña: le cuento por dónde conviene arrancar la noche en Laponia y adónde sigue después.',
  },
  'pt-BR': {
    description: 'Fundador do LaplandVibes. Shows, baladas e as longas noites nos montes. Conto para você por onde vale a pena começar a noitada na Lapônia e para onde ela segue depois.',
  },
  'zh-CN': {
    description: 'LaplandVibes创始人。现场演出、夜店，还有漫长的山地之夜。我告诉你拉普兰的夜该从哪里开始，下半场又去哪里。',
  },
  ko: {
    description: 'LaplandVibes 창립자. 공연과 클럽, 펠에서 보내는 긴 저녁. 라플란드의 밤은 어디서 시작하면 좋은지, 그다음엔 어디로 이어지는지 알려드립니다.',
  },
  fr: {
    description: 'Fondateur de LaplandVibes. Des concerts, des clubs et de longues soirées dans les fjälls. Je vous dis par où commencer une nuit en Laponie, et où elle se poursuit.',
  },
  it: {
    description: 'Fondatore di LaplandVibes. Concerti dal vivo, club e le lunghe serate sui fjäll. Le racconto da dove conviene iniziare una notte in Lapponia e dove proseguirla.',
  },
  nl: {
    description: 'Oprichter van LaplandVibes. Optredens, clubs en lange avonden in de fjälls. Ik vertel u waar u de nacht in Lapland het best begint en waar die daarna verdergaat.',
  },
  sv: {
    description: 'Grundare av LaplandVibes. Spelningar, klubbar och långa kvällar uppe i fjällen. Jag berättar var du ska börja natten i Lappland och vart den sedan tar vägen.',
  },
};
