<template>
  <div class="portfolio">
    <nav class="fixed-menu">
      <ul>
        <li @click="scrollToSection(backgroundRef)">Profile</li>
        <li @click="scrollToSection(worksRef)">Works</li>
        <li @click="scrollToSection(skillRef)">Skill</li>
        <li @click="scrollToSection(contactRef)">Contact</li>
      </ul>
    </nav>

    <div class="scene-container">
      <MovingCube />
      <div class="scene-text">{{ animatedText }}</div>
    </div>

    <div ref="backgroundRef" class="section custom-background">
      <div class="profile-container">
        <div class="profile-title">profile</div>
        <ProfileChangeText />
      </div>
      <div v-for="index in 10" :key="index" class="light-effect"></div>
    </div>

    <div ref="worksRef" class="section work-section">
      <h1 class="work-container-title">WORKS</h1>
      <SlideInImages />
    </div>

    <div ref="skillRef" class="section skill-section">
      <div class="skill-content">
        <h1 class="skill-title">SKILL</h1>

        <div class="shape shape1"></div>
        <div class="shape shape2"></div>
        <div class="shape shape3"></div>
        <div class="shape shape4"></div>
        <div class="shape shape5"></div>

        <div class="icon-all">
          <div class="skill-item" v-for="skill in skills" :key="skill.name">
            <div class="skill-name">{{ skill.name }}</div>
            <font-awesome-icon
              class="skill-icon"
              :icon="skill.icon"
              :style="{ color: skill.color }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="contact">
      <div ref="contactRef" class="section contact-section">
        <h1 class="contact-title">Contact</h1>
        <div>
          Email:
          <a class="contact-mail" href="mailto:7195.teesu.1031@gmail.com">
            7195.teesu.1031@gmail.com
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import "./App.css";
import MovingCube from "./components/MovingCube.vue";
import ProfileChangeText from "./components/ProfileChangeText.vue";
import SlideInImages from "./components/SlideInImages.vue";
import { useTextAnimation } from "./composables/useTextAnimation";
import { useLightEffect } from "./composables/lightEffect";
import { faJs, faLaravel, faPhp, faDocker, faVuejs, faHtml5, faReact, faAws, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "App",
  components: {
    MovingCube,
    ProfileChangeText,
    SlideInImages,
    FontAwesomeIcon,
  },
  setup() {
    const backgroundRef = ref(null);
    const worksRef = ref(null);
    const skillRef = ref(null);
    const contactRef = ref(null);

    const scrollToSection = (refElement) => {
      if (refElement.value) {
        window.scrollTo({
          top: refElement.value.offsetTop,
          behavior: "smooth",
        });
      }
    };

  const animatedText = useTextAnimation(
    "portfolio",
    "web engineer\nTetsuya Kishi",
    4000,
    100
  );

  useLightEffect();

    const skills = [
      { name: "Javascript", icon: faJs, color: "#FFD43B" },
      { name: "Laravel", icon: faLaravel, color: "#FF2D20" },
      { name: "PHP", icon: faPhp, color: "#FFD43B" },
      { name: "Docker", icon: faDocker, color: "#19325d" },
      { name: "Vue.js", icon: faVuejs, color: "#41B883" },
      { name: "HTML/CSS", icon: faHtml5, color: "#E34F26" },
      { name: "React", icon: faReact, color: "#61DAFB" },
      { name: "AWS", icon: faAws, color: "#4b1aff" },
      { name: "Github", icon: faGithub, color: "#15003d" },
    ];

    return {
      backgroundRef,
      worksRef,
      skillRef,
      contactRef,
      scrollToSection,
      animatedText,
      skills,
    };
  },
};
</script>

<style scoped>
/* Tailwindで必要ならここに追加CSS */
</style>
