import { defineStore } from 'pinia';
import { useStoreAuth } from '../stores/storeAuth'

export const useNavigationStore = defineStore("navigationStore", {
    id: 'navigation',
    state: () => ({
        currentLocation: 'checkIn'
    }),
    actions: {
        setCurrentLocation(location){
            this.currentLocation = location;
            console.log("Current location: " + this.currentLocation);
        },
    },
})