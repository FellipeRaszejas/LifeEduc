// Funções de sessão compartilhadas (sem back-end, tudo no navegador)

export function lerSessao() {
  try {
    const bruto =
      localStorage.getItem('lifeeduc:usuario') || sessionStorage.getItem('lifeeduc:usuario')
    return bruto ? JSON.parse(bruto) : null
  } catch {
    return null
  }
}

export function iniciais(nome) {
  const partes = nome.trim().split(/\s+/)
  return (partes[0][0] + (partes.length > 1 ? partes[partes.length - 1][0] : '')).toUpperCase()
}