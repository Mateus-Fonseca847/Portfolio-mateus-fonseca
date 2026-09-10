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

const secaoProjetosPessoais = document.querySelector("#projetos-pessoais");
const trilhaProjetosPessoais = document.querySelector("#carrosselPessoais");
const indicadoresProjetosPessoais = document.querySelector(
  "#carrosselPessoaisIndicadores"
);
const botaoProjetosAnteriores = document.querySelector(
  "[data-carrossel-anterior]"
);
const botaoProximosProjetos = document.querySelector(
  "[data-carrossel-proximo]"
);

let totalDePaginasDoCarrossel = 1;
let paginaAtualDoCarrossel = 0;

function medirCarrosselPessoais() {
  const primeiroCartao = trilhaProjetosPessoais.firstElementChild;

  if (!primeiroCartao) return { passo: 0, cartoesPorPagina: 1, rolagemMaxima: 0 };

  const espacamento = parseFloat(
    window.getComputedStyle(trilhaProjetosPessoais).columnGap
  ) || 0;

  const passo = primeiroCartao.offsetWidth + espacamento;

  const cartoesPorPagina = Math.max(
    1,
    Math.round(trilhaProjetosPessoais.clientWidth / passo)
  );

  const rolagemMaxima = Math.max(
    0,
    trilhaProjetosPessoais.scrollWidth - trilhaProjetosPessoais.clientWidth
  );

  return { passo, cartoesPorPagina, rolagemMaxima };
}

function irParaPaginaDoCarrossel(novaPagina) {
  const { passo, cartoesPorPagina, rolagemMaxima } = medirCarrosselPessoais();

  const paginaDesejada = Math.min(
    Math.max(novaPagina, 0),
    totalDePaginasDoCarrossel - 1
  );

  trilhaProjetosPessoais.scrollTo({
    left: Math.min(paginaDesejada * passo * cartoesPorPagina, rolagemMaxima),
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
}

function atualizarEstadoDoCarrossel() {
  const { rolagemMaxima } = medirCarrosselPessoais();

  paginaAtualDoCarrossel =
    rolagemMaxima > 0
      ? Math.round(
          (trilhaProjetosPessoais.scrollLeft / rolagemMaxima) *
            (totalDePaginasDoCarrossel - 1)
        )
      : 0;

  indicadoresProjetosPessoais
    .querySelectorAll("[data-pagina-carrossel]")
    .forEach((indicador, indiceDoIndicador) => {
      const estaAtivo = indiceDoIndicador === paginaAtualDoCarrossel;

      indicador.classList.toggle("ativo", estaAtivo);
      indicador.setAttribute("aria-current", estaAtivo ? "true" : "false");
    });

  botaoProjetosAnteriores.disabled = paginaAtualDoCarrossel === 0;

  botaoProximosProjetos.disabled =
    paginaAtualDoCarrossel >= totalDePaginasDoCarrossel - 1;
}

function montarIndicadoresDoCarrossel() {
  const { cartoesPorPagina } = medirCarrosselPessoais();
  const quantidadeDeCartoes = trilhaProjetosPessoais.children.length;

  totalDePaginasDoCarrossel = Math.max(
    1,
    Math.ceil(quantidadeDeCartoes / cartoesPorPagina)
  );

  secaoProjetosPessoais.classList.toggle(
    "sem-controles",
    totalDePaginasDoCarrossel === 1
  );

  indicadoresProjetosPessoais.innerHTML = Array.from(
    { length: totalDePaginasDoCarrossel },
    (_, indiceDaPagina) => `
      <button
        class="carrossel-projeto__indicador carrossel-pessoais__indicador"
        type="button"
        aria-label="Ir para a página ${indiceDaPagina + 1} de ${totalDePaginasDoCarrossel}"
        aria-controls="carrosselPessoais"
        data-pagina-carrossel="${indiceDaPagina}"
      ></button>
    `
  ).join("");

  indicadoresProjetosPessoais
    .querySelectorAll("[data-pagina-carrossel]")
    .forEach((indicador) => {
      indicador.addEventListener("click", () => {
        irParaPaginaDoCarrossel(Number(indicador.dataset.paginaCarrossel));
      });
    });

  atualizarEstadoDoCarrossel();
}

if (
  trilhaProjetosPessoais &&
  indicadoresProjetosPessoais &&
  botaoProjetosAnteriores &&
  botaoProximosProjetos
) {
  let atualizacaoAgendada = false;

  botaoProjetosAnteriores.addEventListener("click", () => {
    irParaPaginaDoCarrossel(paginaAtualDoCarrossel - 1);
  });

  botaoProximosProjetos.addEventListener("click", () => {
    irParaPaginaDoCarrossel(paginaAtualDoCarrossel + 1);
  });

  trilhaProjetosPessoais.addEventListener("scroll", () => {
    if (atualizacaoAgendada) return;

    atualizacaoAgendada = true;

    window.requestAnimationFrame(() => {
      atualizarEstadoDoCarrossel();
      atualizacaoAgendada = false;
    });
  });

  trilhaProjetosPessoais.addEventListener("keydown", (evento) => {
    if (evento.key !== "ArrowRight" && evento.key !== "ArrowLeft") return;

    evento.preventDefault();

    irParaPaginaDoCarrossel(
      evento.key === "ArrowRight"
        ? paginaAtualDoCarrossel + 1
        : paginaAtualDoCarrossel - 1
    );
  });

  new ResizeObserver(montarIndicadoresDoCarrossel).observe(
    trilhaProjetosPessoais
  );

  montarIndicadoresDoCarrossel();
}
