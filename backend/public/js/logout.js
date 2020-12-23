function logout(){
    document.cookie = 'myToken=; Max-Age=-99999999;';
    window.location.replace('/login');
}