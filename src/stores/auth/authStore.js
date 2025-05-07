import { defineStore } from 'pinia';
import axios from '@/plugins/axios';
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useLoaderStore } from "@/stores/loader/useLoaderStore";


export const useAuthStore = defineStore('auth', {
    state: () => ({
        loader: useLoaderStore(),
        user: null,
        allUsers: [],
        Users: [],
        getuserbyid: {},
        statadmin: {},
        getuser: {},
        profile: {},
        token: null,
        errors: {}, // 🔥 Stockage des erreurs de validation
        remember: false, // Ajout du flag "Se souvenir de moi"
        email: '',  // Ajout de l'email
        password: '', // Ajout du mot de passe
        isAuthenticated: false, // Ajout du mot de passe
        pagination: {}, // Ajout pour stocker les données de pagination

    }),

    persist: true, // 🔥 Sauvegarde les données après refresh

    actions: {

        clearErrors() {
            this.errors = {}; // 🔥 Réinitialisation manuelle des erreurs
        },

        setErrors(errors) {
            this.errors = errors; // ✅ Assigne les erreurs reçues ou un objet vide
        },

        async register(formData) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.post('/users/register', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                response.data.message = 'User registered successfully. Please verify your email.'; // Afficher le message de vérification email
                notification.setMessage(response.data.message);
                // toast.success(response.data.message); // ✅ Toast de succès
                return response.data;

            } catch (error) {
                if (error.response?.status === 422) {
                    this.setErrors(error.response.data.errors); // 🔥 Stocker les erreurs de validation
                }
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async login(credentials) {
            const notification = useNotificationStore();
            this.errors = {}; // 🔥 Réinitialiser les erreurs avant chaque requête
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.post('/users/login', credentials);

                this.token = response.data.access_token;
                this.user = response.data.user;
                this.remember = credentials.remember; // Stocke la préférence
                this.isAuthenticated = true; // passer la valeur a rue car le user vient de s'ottentifier.
                // Si "Se souvenir de moi" est coché, enregistrement via Pinia Persisted State
                if (credentials.remember) {
                    this.email = credentials.email;
                    this.password = credentials.password;
                } else {
                    this.email = '';
                    this.password = '';
                }


                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

                //message de succes pour la connexion
                notification.setMessage('Connexion reussite');

                return response.data;
            } catch (error) {
                if (error.response?.status === 422) {
                    this.errors = error.response.data.errors; // 🔥 Stocker les erreurs de validation
                }
                console.error("Erreur de connexion :", error.response?.data);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },


        async logout() {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global

                await axios.post('/users/logout'); // Appel API pour invalider le token
                localStorage.removeItem('is_admin');
                notification.setMessage('Deconnexion reussite');

            } catch (error) {
                console.error("Erreur lors de la déconnexion :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }

            // Réinitialisation locale après l'appel API
            this.token = null;
            this.user = null;
            this.errors = {};
            this.getuser = {};
            this.isAuthenticated = false;

            delete axios.defaults.headers.common['Authorization']; // Supprimer le token des requêtes

            // Si "Se souvenir de moi" n'est pas coché, vider les informations
            if (!this.remember) {
                this.email = '';
                this.password = '';
            }

        },


        async getUser() {
            try {
                this.loader.show(); // 👉 Active le loader global


                const response = await axios.get(`/users/auth`);
                this.getuser = response.data;
                return response.data.user;

            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async getUserById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/users/${id}`);
                this.getuserbyid = response.data.user;
                return response.data.user;

            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async statAdmin() {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/users/statAdmin`);
                this.statadmin = response.data;
                return response;

            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async Profile(formData) {
            this.errors = {};
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.post(`/users/${this.getuser.user.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                this.getUser();
                return response.data;

            } catch (error) {
                if (error.response?.status === 422) {
                    this.setErrors(error.response.data.errors); // 🔥 Stocker les erreurs de validation
                }
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },
        async UpdateUser(formData) {
            this.errors = {};
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.post(`/users/${this.getuserbyid.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                this.message = 'Operation reussite'; // Afficher le message de vérification email
                notification.setMessage(this.message);

                this.fetchUsers();

            } catch (error) {
                if (error.response?.status === 422) {
                    this.setErrors(error.response.data.errors); // 🔥 Stocker les erreurs de validation
                }
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }



        },




        // 🔹 ENVOYER LE LIEN DE RÉINITIALISATION
        async sendResetLinkEmail(email) {
            const notification = useNotificationStore();
            this.errors = {};
            try {

                this.loader.show(); // 👉 Active le loader global

                const response = await axios.post('/users/password/email', { email });
                console.log(response.data)
                notification.setMessage(response.data.message);
                return response
            } catch (error) {
                if (error.response?.status === 422) {
                    this.errors = error.response.data.errors;
                }
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },



        // 🔹 RÉINITIALISER LE MOT DE PASSE
        async resetPassword(formData) {
            this.errors = {};
            const notification = useNotificationStore();

            try {
                this.loader.show(); // 👉 Active le loader global

                // Encodage des paramètres pour reconstituer l'URL signée
                const encodedEmail = encodeURIComponent(formData.email);
                const encodedExpires = encodeURIComponent(formData.expires);
                const encodedSignature = encodeURIComponent(formData.signature);

                // Construction de l'URL signée
                const url = `/users/password/reset?email=${encodedEmail}&expires=${encodedExpires}&signature=${encodedSignature}`;

                // Envoi de la requête
                const response = await axios.post(url, {
                    password: formData.password,
                    password_confirmation: formData.password_confirmation,
                });

                notification.setMessage(response.data.message);

                return response.data;
            } catch (error) {
                console.log(error);
                if (error.response?.status === 422) {
                    this.errors = error.response.data.errors;
                } else if (error.response.data.message === "Invalid signature.") {
                    notification.setMessage("Le lien a expire, veuillez recommencer la procedure de reinitialisation de mot de passe, merci!");
                }
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },


        // recuperer le tous avec pagination

        async fetchAllUsers() {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/users/all`);
                this.allUsers = response.data.users; // Stocke les secteurs
                // console.log(response.data.users);
            } catch (error) {
                console.error("Erreur lors de la récupération des users :", error);
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async fetchUsers(page = 1, query = "") {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/users/index?page=${page}&query=${query}`);
                this.Users = response.data.data;
                this.pagination = response.data.meta; // Stocke les données de pagination

            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async destroy(id) {
            const notification = useNotificationStore();
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.delete(`/users/${id}`);
                this.message = 'utilisateur supprimer avec succe'; // Afficher le message de vérification email
                notification.setMessage(this.message);
                this.fetchUsers();
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },

        async fetchUserById(id) {
            try {
                this.loader.show(); // 👉 Active le loader global

                const response = await axios.get(`/users`);
                return response.data.user;
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur", error);
                throw error;
            } finally {
                // await new Promise(resolve => setTimeout(resolve, 2000));
                this.loader.hide(); // 👉 Désactive le loader global
            }
        },



    }
});
