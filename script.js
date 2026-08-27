const observadorDeSecoes = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) entrada.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section-reveal").forEach((secao) => {
  observadorDeSecoes.observe(secao);
});

const botaoMenu = document.querySelector(".mobile-toggle");

botaoMenu?.addEventListener("click", () => {
  document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
  });
});

document.querySelectorAll(".service-item").forEach((itemTecnologia) => {
  itemTecnologia.addEventListener("mouseenter", () => {
    document.querySelectorAll(".service-item").forEach((item) => {
      item.classList.remove("active");
    });

    itemTecnologia.classList.add("active");
  });
});

const dadosDosProjetos = {
  lph: {
    nome: "LPH Hotéis",
    empresa: "LPH Hotéis",
    periodo: "Abr 2026 - Jun 2026",
    tipoDeTrabalho: "Freelance",
    tecnologias: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    resumo: "Desenvolvi uma plataforma web para catálogo público de hotéis e operação administrativa interna.",
    descricao: "",
    imagens: ["./assets/LPHSite1.png", "./assets/LPHSite2.png", "./assets/LPHSite3.png"],
    link: "https://lazerpousadahoteis.com.br",
  },

  promedica: {
    nome: "Sistema de organização empresarial - Promédica",
    empresa: "Promédica",
    periodo: "Fev 2026 - Mar 2026",
    tipoDeTrabalho: "Freelance",
    tecnologias: ["JavaScript", "HTML", "CSS", "Git", "GitHub"],
    resumo: "Desenvolvi uma aplicação web para gestão e controle de relatórios operacionais, substituindo processos manuais em planilhas Excel.",
    descricao: "",
    imagens: ["./assets/projetoPromedica1.png", "./assets/projetoPromedica2.png", "./assets/projetoPromedica3.png"],
    link: "",
  },
};

const modalProjeto = document.querySelector("#modalProjeto");
const conteudoModal = document.querySelector(".modal-projeto__conteudo");
const tituloModalProjeto = document.querySelector("#modalProjetoTitulo");
const resumoModalProjeto = document.querySelector("#modalProjetoResumo");
const detalhesModalProjeto = document.querySelector("#modalProjetoDetalhes");
const imagensModalProjeto = document.querySelector("#modalProjetoImagens");
const linkModalProjeto = document.querySelector("#modalProjetoLink");
const visualizadorImagem = document.querySelector("#visualizadorImagem");
const imagemAmpliada = document.querySelector("#imagemAmpliada");
let imagensDoProjeto = [];
let nomeDoProjetoAtual = "";
let indiceImagemAtual = 0;

function criarCampoModal(rotulo, valor) {
  if (!valor || (Array.isArray(valor) && valor.length === 0)) return "";

  const conteudo = Array.isArray(valor) ? valor.join(" · ") : valor;

  return `
    <div class="modal-projeto__campo">
      <span>${rotulo}</span>
      <strong>${conteudo}</strong>
    </div>
  `;
}

function criarIndicadores() {
  const indicadoresDoCarrossel = imagensModalProjeto.querySelector(
    ".carrossel-projeto__indicadores"
  );

  if (!indicadoresDoCarrossel) return;

  indicadoresDoCarrossel.innerHTML = imagensDoProjeto
    .map(
      (_, indiceDoIndicador) => `
        <button
          class="carrossel-projeto__indicador"
          type="button"
          aria-label="Mostrar imagem ${indiceDoIndicador + 1}"
          data-indice-imagem="${indiceDoIndicador}"
        ></button>
      `
    )
    .join("");

  indicadoresDoCarrossel
    .querySelectorAll("[data-indice-imagem]")
    .forEach((indicador) => {
      indicador.addEventListener("click", () => {
        mostrarImagem(Number(indicador.dataset.indiceImagem));
      });
    });
}

function atualizarCarrossel() {
  const imagemAtual = imagensModalProjeto.querySelector(
    ".carrossel-projeto__imagem"
  );
  const indicadoresDoCarrossel = imagensModalProjeto.querySelectorAll(
    ".carrossel-projeto__indicador"
  );

  if (!imagemAtual || imagensDoProjeto.length === 0) return;

  imagemAtual.classList.remove("visivel");

  window.setTimeout(() => {
    imagemAtual.src = imagensDoProjeto[indiceImagemAtual];
    imagemAtual.alt = `Imagem ${indiceImagemAtual + 1} do projeto ${nomeDoProjetoAtual}`;
    imagemAtual.classList.add("visivel");
  }, 120);

  indicadoresDoCarrossel.forEach((indicador, indiceDoIndicador) => {
    indicador.classList.toggle("ativo", indiceDoIndicador === indiceImagemAtual);
  });
}

function mostrarImagem(novoIndice) {
  const quantidadeDeImagens = imagensDoProjeto.length;
  if (quantidadeDeImagens === 0) return;

  indiceImagemAtual =
    (novoIndice + quantidadeDeImagens) % quantidadeDeImagens;

  atualizarCarrossel();
}

function proximaImagem() {
  mostrarImagem(indiceImagemAtual + 1);
}

function imagemAnterior() {
  mostrarImagem(indiceImagemAtual - 1);
}

function montarCarrosselProjeto(projetoSelecionado) {
  imagensDoProjeto = projetoSelecionado.imagens;
  nomeDoProjetoAtual = projetoSelecionado.nome;
  indiceImagemAtual = 0;

  imagensModalProjeto.innerHTML = projetoSelecionado.imagens
    .length
    ? `
      <div class="carrossel-projeto ${projetoSelecionado.imagens.length === 1 ? "sem-controles" : ""}">
        <button
          class="carrossel-projeto__botao carrossel-projeto__botao--anterior"
          type="button"
          aria-label="Imagem anterior"
          data-imagem-anterior
        >‹</button>

        <div class="carrossel-projeto__quadro">
          <img class="carrossel-projeto__imagem" alt="" />
        </div>

        <button
          class="carrossel-projeto__botao carrossel-projeto__botao--proximo"
          type="button"
          aria-label="Próxima imagem"
          data-proxima-imagem
        >›</button>

        <div class="carrossel-projeto__indicadores" aria-label="Imagens do projeto"></div>
      </div>
    `
    : "";

  criarIndicadores();

  const botaoImagemAnterior = imagensModalProjeto.querySelector(
    "[data-imagem-anterior]"
  );
  const botaoProximaImagem = imagensModalProjeto.querySelector(
    "[data-proxima-imagem]"
  );

  botaoImagemAnterior?.addEventListener("click", imagemAnterior);
  botaoProximaImagem?.addEventListener("click", proximaImagem);

  atualizarCarrossel();
}

function abrirImagemAmpliada(imagemSelecionada) {
  if (!visualizadorImagem || !imagemAmpliada || !imagemSelecionada?.src) return;

  imagemAmpliada.src = imagemSelecionada.src;
  imagemAmpliada.alt = imagemSelecionada.alt;
  visualizadorImagem.classList.add("aberto");
  visualizadorImagem.setAttribute("aria-hidden", "false");
}

function fecharImagemAmpliada() {
  if (!visualizadorImagem || !imagemAmpliada) return;

  visualizadorImagem.classList.remove("aberto");
  visualizadorImagem.setAttribute("aria-hidden", "true");
}

function preencherModalProjeto(projetoSelecionado) {
  tituloModalProjeto.textContent = projetoSelecionado.nome;
  resumoModalProjeto.textContent = projetoSelecionado.resumo;

  montarCarrosselProjeto(projetoSelecionado);

  detalhesModalProjeto.innerHTML = [
    criarCampoModal("Empresa", projetoSelecionado.empresa),
    criarCampoModal("Período", projetoSelecionado.periodo),
    criarCampoModal("Tipo de trabalho", projetoSelecionado.tipoDeTrabalho),
    criarCampoModal("Stack", projetoSelecionado.tecnologias),
    criarCampoModal("Descrição", projetoSelecionado.descricao),
  ].join("");

  if (projetoSelecionado.link) {
    linkModalProjeto.href = projetoSelecionado.link;
    linkModalProjeto.classList.add("visivel");
  } else {
    linkModalProjeto.removeAttribute("href");
    linkModalProjeto.classList.remove("visivel");
  }
}

function abrirModalProjeto(chaveDoProjeto) {
  const projetoSelecionado = dadosDosProjetos[chaveDoProjeto];
  if (!projetoSelecionado || !modalProjeto) return;

  preencherModalProjeto(projetoSelecionado);

  modalProjeto.classList.add("aberto");
  modalProjeto.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-aberto");
  conteudoModal?.focus();
}

function fecharModalProjeto() {
  if (!modalProjeto) return;

  modalProjeto.classList.remove("aberto");
  modalProjeto.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-aberto");
}

document.querySelectorAll("[data-projeto]").forEach((cardProjeto) => {
  cardProjeto.addEventListener("click", (evento) => {
    evento.preventDefault();
    abrirModalProjeto(cardProjeto.dataset.projeto);
  });
});

document.querySelectorAll("[data-fechar-modal]").forEach((elemento) => {
  elemento.addEventListener("click", fecharModalProjeto);
});

imagensModalProjeto?.addEventListener("click", (evento) => {
  const imagemSelecionada = evento.target.closest(".carrossel-projeto__imagem");

  if (imagemSelecionada?.classList.contains("visivel")) {
    abrirImagemAmpliada(imagemSelecionada);
  }
});

document.querySelectorAll("[data-fechar-imagem-ampliada]").forEach((elemento) => {
  elemento.addEventListener("click", fecharImagemAmpliada);
});

imagemAmpliada?.addEventListener("click", fecharImagemAmpliada);

document.addEventListener("keydown", (evento) => {
  if (
    evento.key === "Escape" &&
    visualizadorImagem?.classList.contains("aberto")
  ) {
    fecharImagemAmpliada();
    return;
  }

  if (evento.key === "Escape" && modalProjeto?.classList.contains("aberto")) {
    fecharModalProjeto();
  }
});
