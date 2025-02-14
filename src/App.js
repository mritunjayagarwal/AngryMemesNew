import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/firebaseConfig';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useOrientation } from 'react-use';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})
  const [warning, setWarning] = useState(false);
  const { type } = useOrientation();

  useEffect(() => {
    if(type == "landscape-primary") setWarning(true);
    const unsubscribe = onAuthStateChanged(auth, (result) => {
      if (result) {

        const { displayName, email } = result
        setUserData({ displayName, email })

        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }

    })

    return () => unsubscribe();
  }, [])

  const SignUpUsingGoogle = () => {

    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {

        const { displayName, email, photoURL } = result.user;
        setUserData({ displayName, email, photoURL })

        setIsLoggedIn(true)
      }).catch((error) => {

        console.log({ error });

      });
  }

  const Logout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setUserData({})
      setIsLoggedIn(false)
    }).catch((error) => {
      // An error happened.
      console.log({ error });
    });
  }

  const { unityProvider } = useUnityContext({
    loaderUrl: "build/build.loader.js",
    dataUrl: "build/build.data",
    frameworkUrl: "build/build.framework.js",
    codeUrl: "build/build.wasm",
  });

  return (
    <div className="App">
      {/* <nav className="navbar navbar-expand-lg py-3 m-0 bg-transparent" data-aos="fade-down" data-aos-delay="800">
        <div className="container">
          <a className="navbar-brand me-2" href="#">
            <img src="./assets/img/logo.png" style={{ "width": "80px", "height": "auto", "margin-top": "-10px" }} alt="" /> Angry memes
          </a>
          <button className="navbar-toggler text-white" type="button" data-toggle="collapse" data-target="#navbarText"
            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <i className="fa fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse text-white" id="navbarText">
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a href="#" className="px-3 pt-2 btn-link">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a href="https://medium.com/@junomonetacoin/juno-unleash-the-wealth-within-empowering-your-crypto-journey-e7a7253071a8" className="px-3 pt-2 btn-link">
                  Whitepaper
                </a>
              </li>
              {isLoggedIn &&
              <li className="nav-item">
                  <button type="button" onClick={Logout} className="px-3 btn pt-2 px-5 uni-btn" data-toggle="modal"
                    data-target="#exampleModal" style={{ "font-size": "15px", "margin-top": "-8px", "font-weight": "600" }}>
                    Logout
                  </button>
              </li>
              }
            </ul>
          </div>
        </div>
      </nav> */}
      <main>
      <div className='main-body-web container'>
      {!isLoggedIn &&
        <div>
          <div>
          <img src={require('./img/angrymemes.png')} className='img-fluid angry-memes-logo' alt="" />
          </div>
          <button onClick={SignUpUsingGoogle} type="button" className="login-with-google-btn mt-4" >
            Sign in with Google
          </button>
        </div>
      }

      {!warning && isLoggedIn &&
        <div>
          <Unity unityProvider={unityProvider} className='unity-web'/>
        </div>
      }
      </div>
      </main>


      {warning && isLoggedIn && <div id = "fill-wd" class="d-flex align-items-center justify-content-center" onClick = {() => setWarning(false)} style = {{position: "absolute", left: 0, right: 0, top: 0, bottom: 0, background: "rgba(0,0,0, 0.9)","z-index": 2}}>
    <div class = "text-center">
      <img src={require('./img/rotate.png')} style = {{"z-index": 3, width: "100px"}} alt="" />
      <p class= "text-center text-white mt-4">Roatate to landscape and Click anywhere to play</p>
    </div>
  </div>}
    </div>
  );
}

export default App;
