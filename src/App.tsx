import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.scss";

/* Tailwind CSS */
import "./theme/tailwind.scss";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Home from "./pages/Home";
import Learn from "./pages/Learn";
import Courses from "./pages/Courses";
import Protected from "./pages/Protected";
import { UserProvider } from "./ContextApi/UserContext";
import Lesson from "./pages/Lesson";
import LessonId from "./pages/LessonId";
import Shop from "./pages/Shop";
import LeaderBoard from "./pages/Leaderboard";
import Quest from "./pages/Quest";

setupIonicReact();

const App: React.FC = () => (
  <>
    <SignedIn>
      <UserProvider>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route
                exact
                path="/"
                render={() => (
                  <Protected>
                    <Home />
                  </Protected>
                )}
              />
              <Route
                exact
                path="/learn"
                render={() => (
                  <Protected>
                    <Learn />
                  </Protected>
                )}
              />
              <Route
                exact
                path="/lesson"
                render={() => (
                  <Protected>
                    <Lesson />
                  </Protected>
                )}
              />
              <Route
                exact
                path="/lesson/:id"
                render={() => (
                  <Protected>
                    <LessonId />
                  </Protected>
                )}
              />
              <Route
                exact
                path="/shop"
                render={() => (
                  <Protected>
                    <Shop />
                  </Protected>
                )}
              />
              <Route
                exact
                path="/leaderboard"
                render={() => (
                  <Protected>
                    <LeaderBoard />
                  </Protected>
                )}
              />
              <Route
                exact
                path="/quests"
                render={() => (
                  <Protected>
                    <Quest />
                  </Protected>
                )}
              />
              <Route exact path="/courses" component={Courses} />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </UserProvider>
    </SignedIn>
    <SignedOut>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Home} />
        </IonRouterOutlet>
      </IonReactRouter>
    </SignedOut>
  </>
);

export default App;
