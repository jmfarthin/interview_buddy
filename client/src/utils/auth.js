import decode from 'jwt-decode';

class AuthService {

    // get user data
    // getProfile() {
    //     return decode(this.getToken());
    // }
    // can be used depending on whether or not it is needed

    loggedIn() {
        const token = this.getToken();
        console.log(token);
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
          const decoded = decode(token);
          if (decoded.exp < Date.now() / 1000) {
            return true;
          } else return false;
        } catch (err) {
          return false;
        }
      }

    getToken() {
        return localStorage.getItem('id_token');
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/app');
        // We can reassess this line depending on what we make the main page
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/')
        // We can reassess this line depending on what we make the main page

    }
}

export default new AuthService();