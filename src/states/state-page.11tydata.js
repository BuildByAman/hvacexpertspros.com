import { getFaqsPool } from '../../data/faqsPool.js';
import { getTestimonialsPool } from '../../data/testimonialsPool.js';
import { getWhyChoosePool } from '../../data/whyChoosePool.js';
import { getWhoWeArePool } from '../../data/whoWeArePool.js';

function getSeededRandom(seedString) {
  let seed = 0;
  for (let i = 0; i < seedString.length; i++) {
    seed = (seed * 31 + seedString.charCodeAt(i)) % 2147483647;
  }
  if (seed <= 0) seed += 2147483646;
  return function() {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

function shuffleArray(array, randomFunc) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(randomFunc() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default {
  eleventyComputed: {
    metaTitle: (data) => {
      const stateName = data.state.name;
      const rand = getSeededRandom(data.state.slug);
      const variation = Math.floor(rand() * 3);
      
      const titles = [
        `Emergency AC Technician ${stateName} | 24/7 Service`,
        `AC Technician ${stateName} | Same Day Service`,
        `Local AC Technician ${stateName} | 24/7 Emergency Repairs`
      ];
      return titles[variation];
    },
    metaDesc: (data) => {
      const stateName = data.state.name;
      const rand = getSeededRandom(data.state.slug);
      const variation = Math.floor(rand() * 3);
      
      const descs = [
        `Looking for an emergency AC technician in ${stateName}? We provide 24/7 AC repair services, drain cleaning, and leak repairs. Call now for same day service!`,
        `Need a reliable AC technician in ${stateName}? Our local experts offer same day service for water heaters, clogs, and emergency AC repair repairs. Call us 24/7.`,
        `Top-rated local AC technician in ${stateName}. We specialize in 24/7 emergency AC repair, pipe leak repairs, and drain cleaning. Get fast, reliable service today!`
      ];
      return descs[variation];
    },
    h1Title: (data) => {
      const stateName = data.state.name;
      const rand = getSeededRandom(data.state.slug);
      const variation = Math.floor(rand() * 3);
      
      const h1s = [
        `Expert AC Technician in ${stateName}`,
        `Top Rated AC Technicians in ${stateName}`,
        `Local Emergency AC Technician in ${stateName}`
      ];
      return h1s[variation];
    },
    
    faqs: (data) => {
      const state = data.state;
      const rand = getSeededRandom(state.slug);
      const allFaqs = getFaqsPool(null, state, data.site.BRAND, data.site.PHONE);
      return shuffleArray(allFaqs, rand).slice(0, 5);
    },
    testimonials: (data) => {
      const state = data.state;
      const rand = getSeededRandom(state.slug);
      const allTestimonials = getTestimonialsPool(null, state, data.site.BRAND);
      return shuffleArray(allTestimonials, rand).slice(0, 3);
    },
    whyChooseContent: (data) => {
      const state = data.state;
      const rand = getSeededRandom(state.slug);
      const allWhyChoose = getWhyChoosePool(null, state, data.site.BRAND);
      return allWhyChoose[Math.floor(rand() * allWhyChoose.length)];
    },
    whoWeAreContent: (data) => {
      const state = data.state;
      const rand = getSeededRandom(state.slug);
      const allWhoWeAre = getWhoWeArePool(null, state, data.site.BRAND);
      return allWhoWeAre[Math.floor(rand() * allWhoWeAre.length)];
    },
    localRiskText: (data) => {
      const state = data.state;
      let text = `${state.name} homeowners and businesses can rely on our licensed local AC technicians for all AC repair needs — from emergency repairs to routine maintenance.`;
      const coldStates = ['WI','MN','MI','NY','IL','ND','SD','OH','PA','ME','VT','NH','IA','MA','MT','WY','CO','ID'];
      const hotStates = ['FL','TX','AZ','NV','NM'];
      if (coldStates.includes(state.abbr)) {
        text = `During severe winter storms and blizzards, ${state.name} homes are especially vulnerable to massive grid failures and deadly power outages. Our AC technicians respond fast with emergency generator installations, panel heavy-ups, and severe weather fault repairs to protect your family.`;
      } else if (hotStates.includes(state.abbr)) {
        text = `${state.name}'s extreme summer heat forces air conditioning units to run continuously, placing immense strain on aging AC repair panels. Our master AC technicians are experts at balancing loads, upgrading overloaded circuits, and preventing catastrophic panel meltdowns in this climate.`;
      }
      return text;
    }
  }
};
