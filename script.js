const PATTERN_BRANDBOOK_SVG = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 100">
  <path d="M 0,50 C 30,15 60,15 90,50 C 120,85 150,85 180,50" fill="none" stroke="#F2EFEB" stroke-width="2.5" opacity="0.65"/>
  <path d="M 0,50 C 30,85 60,85 90,50 C 120,15 150,15 180,50" fill="none" stroke="#3B787F" stroke-width="2.5"/>
</svg>`);

const DADOS_CLIENTE = {
  nome: "DR. LUCAS HENRIQUE",
  especialidade: "REUMATOLOGISTA",

  clinicas: [
    {
      regiao: "ASA SUL · BRASÍLIA/DF",
      nome: "Clínica Vertuo",
      telefoneExibicao: "(61) 4042-7485",
      logoUrl: "./img/vertuo-logo.jpg",
      linkAgendamento: "https://wa.me/556140427485?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20o%20Dr.%20Lucas%20Henrique%20na%20Cl%C3%ADnica%20Vertuo.",
      linkLocalizacao: "https://maps.google.com/?q=Clinica+Vertuo+Asa+Sul+Brasilia",
      linkInstagram: "https://www.instagram.com/clinicavertuo"
    },
    {
      regiao: "GAMA · BRASÍLIA/DF",
      nome: "Clínica Labrum",
      telefoneExibicao: "(61) 99166-5151",
      logoUrl: "./img/labrum-logo.jpg",
      linkAgendamento: "https://wa.me/5561991665151?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20uma%20consulta%20com%20o%20Dr.%20Lucas%20Henrique%20na%20Cl%C3%ADnica%20Labrum.",
      linkLocalizacao: "https://maps.google.com/?q=Clinica+Labrum+Gama+Brasilia",
      linkInstagram: "https://www.instagram.com/clinica.labrum"
    }
  ],

  conteudos: [
    {
      titulo: "Conteúdo de reumatologia",
      icone: "ph-book-open-text",
      url: "#",
      emBreve: true
    }
  ],

  rodape: {
    credenciais: "CRM-DF 26750  |  RQE 26471",
    responsavel: "Responsável técnico: Dr. Lucas Henrique",
    avisoUrgencia: "Em caso de urgência, procure um pronto-socorro."
  }
};

function criarMarcaDaguaCard() {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "card-watermark");
  svg.setAttribute("aria-hidden", "true");

  const use = document.createElementNS(svgNS, "use");
  use.setAttribute("href", "#submark-lh");
  svg.appendChild(use);

  return svg;
}

function criarBotao(classe, href, iconeClasse, texto) {
  const a = document.createElement("a");
  a.className = `btn ${classe} pop-btn`;
  a.href = href;
  a.target = "_blank";
  a.rel = "noopener noreferrer";

  const i = document.createElement("i");
  i.className = iconeClasse;
  a.appendChild(i);
  a.appendChild(document.createTextNode(texto));

  return a;
}

function criarCardClinica(clinica) {
  const card = document.createElement("article");
  card.className = "clinic-card";
  card.appendChild(criarMarcaDaguaCard());

  // Cabeçalho do card
  const headerDiv = document.createElement("div");
  headerDiv.className = "clinic-header";

  const logoBox = document.createElement("div");
  logoBox.className = "clinic-logo-box";
  const logoImg = document.createElement("img");
  logoImg.src = clinica.logoUrl;
  logoImg.alt = `Logo ${clinica.nome}`;
  logoBox.appendChild(logoImg);

  const infoDiv = document.createElement("div");
  infoDiv.className = "clinic-info";

  const regiaoSpan = document.createElement("span");
  regiaoSpan.className = "clinic-region";
  regiaoSpan.textContent = clinica.regiao;

  const nomeH3 = document.createElement("h3");
  nomeH3.className = "clinic-name";
  nomeH3.textContent = clinica.nome;

  const foneP = document.createElement("p");
  foneP.className = "clinic-phone";
  foneP.textContent = clinica.telefoneExibicao;

  infoDiv.append(regiaoSpan, nomeH3, foneP);
  headerDiv.append(logoBox, infoDiv);

  // Botões
  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.className = "clinic-buttons";

  const btnAgendar = criarBotao("btn-primary", clinica.linkAgendamento, "ph ph-whatsapp-logo", "Agendar consulta");

  const secondaryRow = document.createElement("div");
  secondaryRow.className = "clinic-secondary-row";
  secondaryRow.append(
    criarBotao("btn-outline", clinica.linkLocalizacao, "ph ph-map-pin", "Localização"),
    criarBotao("btn-outline", clinica.linkInstagram, "ph ph-instagram-logo", "Instagram")
  );

  buttonsWrapper.append(btnAgendar, secondaryRow);
  card.append(headerDiv, buttonsWrapper);

  return card;
}

function inicializarPortfolio() {
  document.getElementById("profile-name").textContent = DADOS_CLIENTE.nome;
  document.getElementById("profile-specialty").textContent = DADOS_CLIENTE.especialidade;

  // Clínica 1 à esquerda da foto, clínica 2 à direita
  const slots = [
    document.getElementById("clinic-left"),
    document.getElementById("clinic-right")
  ];
  DADOS_CLIENTE.clinicas.forEach((clinica, index) => {
    const slot = slots[index];
    if (slot) slot.appendChild(criarCardClinica(clinica));
  });

  // Conteúdos
  const contentContainer = document.getElementById("content-container");
  DADOS_CLIENTE.conteudos.forEach((item) => {
    const el = document.createElement(item.emBreve ? "div" : "a");
    el.className = `content-item ${item.emBreve ? "disabled" : "pop-btn"}`;

    if (!item.emBreve) {
      el.href = item.url;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }

    const left = document.createElement("div");
    left.className = "content-item-left";

    const icon = document.createElement("i");
    icon.className = `ph ${item.icone}`;

    const text = document.createElement("span");
    text.textContent = item.titulo;

    left.append(icon, text);
    el.appendChild(left);

    if (item.emBreve) {
      const badge = document.createElement("span");
      badge.className = "badge-soon";
      badge.textContent = "EM BREVE";
      el.appendChild(badge);
    } else {
      const arrow = document.createElement("i");
      arrow.className = "ph ph-caret-right";
      el.appendChild(arrow);
    }

    contentContainer.appendChild(el);
  });

  // Rodapé
  document.getElementById("card-credentials").textContent = DADOS_CLIENTE.rodape.credenciais;
  document.getElementById("card-responsible").textContent = DADOS_CLIENTE.rodape.responsavel;
  document.getElementById("footer-warning").textContent = DADOS_CLIENTE.rodape.avisoUrgencia;
}

document.addEventListener("DOMContentLoaded", inicializarPortfolio);