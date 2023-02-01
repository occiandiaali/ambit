import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        {/* <ExploreContainer name="Tab 1 page" /> */}

        <IonList className="drop-container">
          <IonItem>
            <IonSelect placeholder="Select category">
              <IonSelectOption value="apples">Mechanic</IonSelectOption>
              <IonSelectOption value="oranges">Electrician</IonSelectOption>
              <IonSelectOption value="bananas">Plumber</IonSelectOption>
              <IonSelectOption value="apples">Mechanic</IonSelectOption>
              <IonSelectOption value="oranges">Electrician</IonSelectOption>
              <IonSelectOption value="bananas">Plumber</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        <MapContainer
          className="container"
          id="map-container"
          center={[6.7189, 3.4019]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[6.7189, 3.4019]}>
            <Popup>
              This flag is a marker <br /> that shows your location..
            </Popup>
          </Marker>
        </MapContainer>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
