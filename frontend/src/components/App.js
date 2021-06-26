import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isAuthSuccessful, setIsAuthSuccessful] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    avatar: '',
    about: '',
  });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const history = useHistory();

  React.useEffect(() => {
    function tokenCheck() {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        api.checkToken(jwt)
          .then((res) => {
            if (res) {
              api.setToken(jwt);
              setLoggedIn(true);
              setEmail(res.email);
              history.push("/");
            }
          })
          .catch(err => console.log(err));
      }
    }

    tokenCheck();

  }, [history]);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch(err => console.log(err));
    }
  }, [email, loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);

    api.likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards(cards => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(info) {
    api.setUserInfo(info)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(info) {
    api.setUserAvatar(info)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(info) {
    api.createCard(info)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleLogin(email, password) {
    api.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          api.setToken(data.token);
        }
        setLoggedIn(true);
        setEmail(email);
        history.push('/');
      })
      .catch(err => {
        setIsAuthSuccessful(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      });
  }

  function handleRegister(email, password) {
    api.register(email, password)
      .then(() => {
        setIsAuthSuccessful(true);
        history.push('/sign-in');
      })
      .catch(err => {
        setIsAuthSuccessful(false);
        console.log(err);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleSignOut() {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onSignOut={handleSignOut} />

        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute path="/"
            component={Main}
            cards={cards} loggedIn={loggedIn}
            onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        </Switch>

        <InfoTooltip isOpen={isInfoTooltipOpen} success={isAuthSuccessful} onClose={closeAllPopups} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm name="confirmation" title="Вы уверены?" buttonText="Да"
          isOpen={false} onClose={closeAllPopups} />

        {selectedCard && <ImagePopup card={selectedCard} onClose={closeAllPopups} />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
