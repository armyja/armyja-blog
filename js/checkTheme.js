let storageColorScheme = localStorage.getItem('theme')
if (storageColorScheme == 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.getElementsByTagName('html')[0].classList.add('dark')
}
