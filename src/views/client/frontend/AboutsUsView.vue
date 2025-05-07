<template>
    <div class="bgcolor2">
        <Navbar></Navbar>

        <!-- Section Hero -->
        <section class="hero-section text-center">
            <div class="container">
                <h1>Apprenez avec les meilleurs</h1>
                <p class="lead">Notre mission est de rendre l'éducation accessible à tous, partout dans le monde.</p>
            </div>
        </section>

        <!-- Section Notre mission -->
        <section class="mission-section text-center bgcolor1 text">
            <div class="container ">
                <h2 class="fw-bold text-white">Notre mission</h2>
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <p class="lead">
                            Chez [Votre Nom], nous croyons que l'apprentissage ne doit avoir aucune limite. Nous nous
                            efforçons d'offrir une expérience d'apprentissage en ligne
                            de haute qualité qui vous permet de développer de nouvelles compétences et de vous épanouir
                            dans votre carrière.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Nos chiffres -->
        <section class="stats-section">
            <div class="container">
                <h2 class="fw-bold">Nos chiffres</h2>
                <div class="row">
                    <div class="col-md-4">
                        <div class="stats-box">
                            <strong>500+</strong>
                            <p>Cours disponibles</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="stats-box">
                            <strong>10,000+</strong>
                            <p>Étudiants inscrits</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="stats-box">
                            <strong>100+</strong>
                            <p>Formateurs experts</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Processus d'apprentissage -->
        <section class="process-section text-center bgcolor1 text-white">
            <div class="container">
                <h2 class="fw-bold">Notre processus d'apprentissage</h2>
                <div class="row">
                    <div class="col-md-4">
                        <h4>1. Sélectionnez un cours</h4>
                        <p>Choisissez parmi des centaines de cours dans diverses disciplines, proposés par des
                            formateurs qualifiés.</p>
                    </div>
                    <div class="col-md-4">
                        <h4>2. Apprenez à votre rythme</h4>
                        <p>Progressez à votre propre rythme, avec des vidéos, des quiz et des ressources
                            téléchargeables.</p>
                    </div>
                    <div class="col-md-4">
                        <h4>3. Recevez une certification</h4>
                        <p>Obtenez des certificats après avoir terminé les cours et démontrez vos nouvelles compétences.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Témoignages -->
        <section class="testimonial-section bgcolor2 text">
            <div class="container">
                <h2 class="pb-4 text-white text-center fw-bold">Ce que disent nos étudiants</h2>
                <div class="row">
                    <div class="col-md-4">
                        <div class="testimonial bgcolor1">
                            <p>"Cette plateforme m'a permis de développer mes compétences et d'obtenir un emploi dans le
                                domaine de la technologie !"</p>
                            <strong>– Jean Dupont</strong>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="testimonial bgcolor1">
                            <p>"Les cours sont clairs et bien organisés. J'ai adoré apprendre avec des formateurs
                                passionnés !"</p>
                            <strong>– Marie Durant</strong>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="testimonial bgcolor1">
                            <p>"Le processus est facile et les certifications m'ont vraiment aidé dans ma carrière."</p>
                            <strong>– Paul Martin</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- Section FAQ -->
        <section class="faq-section text-center  bgcolor1" id="faq-section">
            <div class="container ">
                <h2 class="text-white shadow border p-4 mb-5 fw-bold">Questions fréquentes</h2>
                <div class="row justify-content-center ">
                    <div class="col-md-8 ">
                        <div class="accordion shadow rounded " id="faqAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header " id="faqHeading1">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#faqCollapse1">
                                        Comment puis-je m'inscrire à un cours ?
                                    </button>
                                </h2>
                                <div id="faqCollapse1" class="accordion-collapse collapse show"
                                    data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Pour vous inscrire, il vous suffit de créer un compte, de choisir un cours et de
                                        suivre les instructions pour le paiement.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="faqHeading2">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#faqCollapse2">
                                        Puis-je obtenir un certificat après avoir terminé un cours ?
                                    </button>
                                </h2>
                                <div id="faqCollapse2" class="accordion-collapse collapse"
                                    data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Oui, après avoir terminé un cours avec succès, vous recevrez un certificat de
                                        compétence.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="faqHeading3">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#faqCollapse3">
                                        Les cours sont-ils accessibles sur mobile ?
                                    </button>
                                </h2>
                                <div id="faqCollapse3" class="accordion-collapse collapse"
                                    data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Oui, tous nos cours sont accessibles sur mobile, tablette et ordinateur.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Nos avantages -->
        <section class="advantages-section text-center text-white">
            <div class="container">
                <h2 class="fw-bold">Nos avantages</h2>
                <div class="row">
                    <div class="col-md-4">
                        <div class="advantages-box">
                            <h4>Accès à vie</h4>
                            <p>Accédez à vos cours à tout moment, pour toujours.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="advantages-box">
                            <h4>Support 24/7</h4>
                            <p>Notre équipe est disponible à tout moment pour vous aider.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="advantages-box">
                            <h4>Cours actualisés</h4>
                            <p>Nous mettons régulièrement à jour nos cours pour vous offrir le meilleur.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Notre équipe -->
        <section class="team-section text-center  bgcolor1">
            <div class="container">
                <h2 class="pb-5 fw-bold text-white">Rencontrez notre équipe</h2>
                <div class="row">
                    <div class="col-md-4">
                        <div class="team-member text">
                            <img src="https://placehold.co/10" alt="Member Image">
                            <h5>Jean-Michel Larose</h5>
                            <p>Formateur en développement web</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="team-member text">
                            <img src="https://placehold.co/10" alt="Member Image">
                            <h5>Marie Legrand</h5>
                            <p>Spécialiste en design graphique</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="team-member text">
                            <img src="https://placehold.co/10" alt="Member Image">
                            <h5>Paul Martin</h5>
                            <p>Consultant en marketing numérique</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <FooterComponent class="mt-0"></FooterComponent>
    </div>
</template>

<script setup>
import Navbar from "@/components/client/frontend/Nabvar/NabvarComponent.vue";
import FooterComponent from "@/components/client/frontend/Footer/FooterComponent.vue";


</script>


<style scoped>
/* Section Hero */
.hero-section {
    background: url('https://placehold.co/1920x600') no-repeat center center/cover;
    color: white;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-section h1 {
    font-size: 3.5rem;
    font-weight: bold;
}

/* Section Mission */
.mission-section {
    padding: 80px 0;
}

.mission-section h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
}

/* Section Stats */
.stats-section {
    padding: 80px 0;
    background-color: #343a40;
    color: white;
    text-align: center;
}

.stats-section h2 {
    font-size: 2.5rem;
    margin-bottom: 40px;
}

.stats-box {
    font-size: 2rem;
}

/* Section Processus d'apprentissage */
.process-section {
    padding: 80px 0;
}

.process-section h2 {
    margin-bottom: 40px;
}

/* Section Témoignages */
.testimonial-section {
    padding: 80px 0;
}

.testimonial {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

/* Section FAQ */
.faq-section {
    padding: 80px 0;
}



/* Section Avantages */
.advantages-section {
    padding: 80px 0;
    background-color: #4d5053;
}

.advantages-box {
    margin-top: 30px;
}

/* Section Team */
.team-section {
    padding: 80px 0;
}

.accordion-item h2 button {
    background-color: #191c24;
    /* color: #6c7293; */
    color: #ffffff;
}

.accordion-body {
    background-color: #000000;
    color: #6c7293;
}

.team-member img {
    width: 100%;
    border-radius: 50%;
    margin-bottom: 15px;
}

.team-member h5 {
    font-size: 1.25rem;
    margin-top: 15px;
}

/* Footer */
footer {
    background-color: #343a40;
    color: white;
    padding: 40px 0;
}
</style>