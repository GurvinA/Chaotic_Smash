<template>
  <div class="setup-wrapper">

  

    <v-row>
      <v-col>
        <Board v-model:selectedCharacters="selectedCharacters":selectedLocations="selectedLocations" />
      </v-col>
      <v-col>
        <SelectorDeck/>
      </v-col>
      
    </v-row>



    <!-- <v-row>
      <v-btn color="success" class="mt-4" @click="lockIn">Lock In</v-btn>
    </v-row> -->


  </div>
</template>





<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import Board from '@/components/Board.vue'
import SelectorDeck from '@/components/SelectorDeck.vue'
import type { Character, Location } from '@/Types';

const store = useGameStore()
const route = useRoute()
const router = useRouter()

const characters = ref([
  { name: "Mario", image: "mario.png", stats: {} },
  { name: "Donkey Kong", image: "donkey_kong.png", stats: {} },
  { name: "Link", image: "link.png", stats: {} },
  { name: "Samus", image: "samus.png", stats: {} },
  { name: "Dark Samus", image: "dark_samus.png", stats: {} },
  { name: "Yoshi", image: "yoshi.png", stats: {} },
  { name: "Kirby", image: "kirby.png", stats: {} },
  { name: "Fox", image: "fox.png", stats: {} },
  { name: "Pikachu", image: "pikachu.png", stats: {} },
  { name: "Luigi", image: "luigi.png", stats: {} },
  { name: "Ness", image: "ness.png", stats: {} },
  { name: "Captain Falcon", image: "captain_falcon.png", stats: {} },
  { name: "Jigglypuff", image: "jigglypuff.png", stats: {} },
  { name: "Peach", image: "peach.png", stats: {} },
  { name: "Daisy", image: "daisy.png", stats: {} },
  { name: "Bowser", image: "bowser.png", stats: {} },
  { name: "Ice Climbers", image: "ice_climbers.png", stats: {} },
  { name: "Sheik", image: "sheik.png", stats: {} },
  { name: "Zelda", image: "zelda.png", stats: {} },
  { name: "Dr. Mario", image: "dr_mario.png", stats: {} },
  { name: "Pichu", image: "pichu.png", stats: {} },
  { name: "Falco", image: "falco.png", stats: {} },
  { name: "Marth", image: "marth.png", stats: {} },
  { name: "Lucina", image: "lucina.png", stats: {} },
  { name: "Young Link", image: "young_link.png", stats: {} },
  { name: "Ganondorf", image: "ganondorf.png", stats: {} },
  { name: "Mewtwo", image: "mewtwo.png", stats: {} },
  { name: "Roy", image: "roy.png", stats: {} },
  { name: "Chrom", image: "chrom.png", stats: {} },
  { name: "Mr. Game & Watch", image: "mr_game_and_watch.png", stats: {} },
  { name: "Meta Knight", image: "meta_knight.png", stats: {} },
  { name: "Pit", image: "pit.png", stats: {} },
  { name: "Dark Pit", image: "dark_pit.png", stats: {} },
  { name: "Zero Suit Samus", image: "zero_suit_samus.png", stats: {} },
  { name: "Wario", image: "wario.png", stats: {} },
  { name: "Snake", image: "snake.png", stats: {} },
  { name: "Ike", image: "ike.png", stats: {} },
  { name: "Pokemon Trainer", image: "pokemon_trainer.png", stats: {} },
  { name: "Diddy Kong", image: "diddy_kong.png", stats: {} },
  { name: "Lucas", image: "lucas.png", stats: {} },
  { name: "Sonic", image: "sonic.png", stats: {} },
  { name: "King Dedede", image: "king_dedede.png", stats: {} },
  { name: "Olimar", image: "olimar.png", stats: {} },
  { name: "Lucario", image: "lucario.png", stats: {} },
  { name: "R.O.B.", image: "rob.png", stats: {} },
  { name: "Toon Link", image: "toon_link.png", stats: {} },
  { name: "Wolf", image: "wolf.png", stats: {} },
  { name: "Villager", image: "villager.png", stats: {} },
  { name: "Mega Man", image: "mega_man.png", stats: {} },
  { name: "Wii Fit Trainer", image: "wii_fit_trainer.png", stats: {} },
  { name: "Rosalina & Luma", image: "rosalina_and_luma.png", stats: {} },
  { name: "Little Mac", image: "little_mac.png", stats: {} },
  { name: "Greninja", image: "greninja.png", stats: {} },
  { name: "Palutena", image: "palutena.png", stats: {} },
  { name: "Pac-Man", image: "pac_man.png", stats: {} },
  { name: "Robin", image: "robin.png", stats: {} },
  { name: "Shulk", image: "shulk.png", stats: {} },
  { name: "Bowser Jr.", image: "bowser_jr.png", stats: {} },
  { name: "Duck Hunt Duo", image: "duck_hunt_duo.png", stats: {} },
  { name: "Ryu", image: "ryu.png", stats: {} },
  { name: "Ken", image: "ken.png", stats: {} },
  { name: "Cloud", image: "cloud.png", stats: {} },
  { name: "Corrin", image: "corrin.png", stats: {} },
  { name: "Bayonetta", image: "bayonetta.png", stats: {} },
  { name: "Inkling", image: "inkling.png", stats: {} },
  { name: "Ridley", image: "ridley.png", stats: {} },
  { name: "Simon", image: "simon.png", stats: {} },
  { name: "Richter", image: "richter.png", stats: {} },
  { name: "King K. Rool", image: "king_k_rool.png", stats: {} },
  { name: "Isabelle", image: "isabelle.png", stats: {} },
  { name: "Incineroar", image: "incineroar.png", stats: {} },
  { name: "Piranha Plant", image: "piranha_plant.png", stats: {} },
  { name: "Joker", image: "joker.png", stats: {} },
  { name: "Hero", image: "hero.png", stats: {} },
  { name: "Banjo & Kazooie", image: "banjo_and_kazooie.png", stats: {} },
  { name: "Terry", image: "terry.png", stats: {} },
  { name: "Byleth", image: "byleth.png", stats: {} },
  { name: "Min Min", image: "min_min.png", stats: {} },
  { name: "Steve", image: "steve.png", stats: {} },
  { name: "Sephiroth", image: "sephiroth.png", stats: {} },
  { name: "Pyra/Mythra", image: "pyra_mythra.png", stats: {} },
  { name: "Kazuya", image: "kazuya.png", stats: {} },
  { name: "Sora", image: "sora.png", stats: {} },
  { name: "Mii Brawler", image: "mii_brawler.png", stats: {} },
  { name: "Mii Swordfighter", image: "mii_swordfighter.png", stats: {} },
  { name: "Mii Gunner", image: "mii_gunner.png", stats: {} },
  { name: "Random", image: "random.png", stats: {} }
])

const locations = ref([
  { name: "Battlefield", image: "battlefield.png", stats: {} },
  { name: "Small Battlefield", image: "small_battlefield.png", stats: {} },
  { name: "Big Battlefield", image: "big_battlefield.png", stats: {} },
  { name: "Final Destination", image: "final_destination.png", stats: {} },
  { name: "Peach's Castle", image: "peachs_castle.png", stats: {} },
  { name: "Kongo Jungle", image: "kongo_jungle.png", stats: {} },
  { name: "Hyrule Castle", image: "hyrule_castle.png", stats: {} },
  { name: "Super Happy Tree", image: "super_happy_tree.png", stats: {} },
  { name: "Dream Land", image: "dream_land.png", stats: {} },
  { name: "Saffron City", image: "saffron_city.png", stats: {} },
  { name: "Mushroom Kingdom", image: "mushroom_kingdom.png", stats: {} },
  { name: "Princess Peach's Castle", image: "princess_peachs_castle.png", stats: {} },
  { name: "Rainbow Cruise", image: "rainbow_cruise.png", stats: {} },
  { name: "Kongo Falls", image: "kongo_falls.png", stats: {} },
  { name: "Jungle Japes", image: "jungle_japes.png", stats: {} },
  { name: "Great Bay", image: "great_bay.png", stats: {} },
  { name: "Temple", image: "temple.png", stats: {} },
  { name: "Brinstar", image: "brinstar.png", stats: {} },
  { name: "Yoshi's Island (Melee)", image: "yoshis_island_melee.png", stats: {} },
  { name: "Yoshi's Story", image: "yoshis_story.png", stats: {} },
  { name: "Fountain of Dreams", image: "fountain_of_dreams.png", stats: {} },
  { name: "Green Greens", image: "green_greens.png", stats: {} },
  { name: "Corneria", image: "corneria.png", stats: {} },
  { name: "Venom", image: "venom.png", stats: {} },
  { name: "Pokémon Stadium", image: "pokemon_stadium.png", stats: {} },
  { name: "Onett", image: "onett.png", stats: {} },
  { name: "Mushroom Kingdom II", image: "mushroom_kingdom_ii.png", stats: {} },
  { name: "Brinstar Depths", image: "brinstar_depths.png", stats: {} },
  { name: "Big Blue", image: "big_blue.png", stats: {} },
  { name: "Fourside", image: "fourside.png", stats: {} },
  { name: "Delfino Plaza", image: "delfino_plaza.png", stats: {} },
  { name: "Mushroomy Kingdom", image: "mushroomy_kingdom.png", stats: {} },
  { name: "Figure-8 Circuit", image: "figure_8_circuit.png", stats: {} },
  { name: "WarioWare, Inc.", image: "warioware_inc.png", stats: {} },
  { name: "Bridge of Eldin", image: "bridge_of_eldin.png", stats: {} },
  { name: "Norfair", image: "norfair.png", stats: {} },
  { name: "Frigate Orpheon", image: "frigate_orpheon.png", stats: {} },
  { name: "Yoshi's Island", image: "yoshis_island.png", stats: {} },
  { name: "Halberd", image: "halberd.png", stats: {} },
  { name: "Lylat Cruise", image: "lylat_cruise.png", stats: {} },
  { name: "Pokémon Stadium 2", image: "pokemon_stadium_2.png", stats: {} },
  { name: "Port Town Aero Dive", image: "port_town_aero_dive.png", stats: {} },
  { name: "Castle Siege", image: "castle_siege.png", stats: {} },
  { name: "Distant Planet", image: "distant_planet.png", stats: {} },
  { name: "Smashville", image: "smashville.png", stats: {} },
  { name: "New Pork City", image: "new_pork_city.png", stats: {} },
  { name: "Summit", image: "summit.png", stats: {} },
  { name: "Skyworld", image: "skyworld.png", stats: {} },
  { name: "Shadow Moses Island", image: "shadow_moses_island.png", stats: {} },
  { name: "Luigi's Mansion", image: "luigis_mansion.png", stats: {} },
  { name: "Pirate Ship", image: "pirate_ship.png", stats: {} },
  { name: "Spear Pillar", image: "spear_pillar.png", stats: {} },
  { name: "75 m", image: "75m.png", stats: {} },
  { name: "Mario Bros.", image: "mario_bros.png", stats: {} },
  { name: "Hanenbow", image: "hanenbow.png", stats: {} },
  { name: "Green Hill Zone", image: "green_hill_zone.png", stats: {} },
  { name: "3D Land", image: "3d_land.png", stats: {} },
  { name: "Golden Plains", image: "golden_plains.png", stats: {} },
  { name: "Paper Mario", image: "paper_mario.png", stats: {} },
  { name: "Gerudo Valley", image: "gerudo_valley.png", stats: {} },
  { name: "Spirit Train", image: "spirit_train.png", stats: {} },
  { name: "Dream Land GB", image: "dream_land_gb.png", stats: {} },
  { name: "Unova Pokémon League", image: "unova_pokemon_league.png", stats: {} },
  { name: "Prism Tower", image: "prism_tower.png", stats: {} },
  { name: "Mute City", image: "mute_city.png", stats: {} },
  { name: "SNES", image: "snes.png", stats: {} },
  { name: "Magicant", image: "magicant.png", stats: {} },
  { name: "Arena Ferox", image: "arena_ferox.png", stats: {} },
  { name: "Reset Bomb Forest", image: "reset_bomb_forest.png", stats: {} },
  { name: "Tortimer Island", image: "tortimer_island.png", stats: {} },
  { name: "Balloon Fight", image: "balloon_fight.png", stats: {} },
  { name: "Living Room", image: "living_room.png", stats: {} },
  { name: "Find Mii", image: "find_mii.png", stats: {} },
  { name: "Tomodachi Life", image: "tomodachi_life.png", stats: {} },
  { name: "PictoChat 2", image: "pictochat_2.png", stats: {} },
  { name: "Mushroom Kingdom U", image: "mushroom_kingdom_u.png", stats: {} },
  { name: "Mario Galaxy", image: "mario_galaxy.png", stats: {} },
  { name: "Mario Circuit", image: "mario_circuit.png", stats: {} },
  { name: "Skyloft", image: "skyloft.png", stats: {} },
  { name: "The Great Cave Offensive", image: "great_cave_offensive.png", stats: {} },
  { name: "Kalos Pokémon League", image: "kalos_pokemon_league.png", stats: {} },
  { name: "Coliseum", image: "coliseum.png", stats: {} },
  { name: "Flat Zone X", image: "flat_zone_x.png", stats: {} },
  { name: "Palutena's Temple", image: "palutenas_temple.png", stats: {} },
  { name: "Gamer", image: "gamer.png", stats: {} },
  { name: "Garden of Hope", image: "garden_of_hope.png", stats: {} },
  { name: "Town and City", image: "town_and_city.png", stats: {} },
  { name: "Wii Fit Studio", image: "wii_fit_studio.png", stats: {} },
  { name: "Boxing Ring", image: "boxing_ring.png", stats: {} },
  { name: "Gaur Plain", image: "gaur_plain.png", stats: {} },
  { name: "Duck Hunt", image: "duck_hunt.png", stats: {} },
  { name: "Wrecking Crew", image: "wrecking_crew.png", stats: {} },
  { name: "Pilotwings", image: "pilotwings.png", stats: {} },
  { name: "Wuhu Island", image: "wuhu_island.png", stats: {} },
  { name: "Windy Hill Zone", image: "windy_hill_zone.png", stats: {} },
  { name: "Wily Castle", image: "wily_castle.png", stats: {} },
  { name: "PAC-LAND", image: "pac_land.png", stats: {} },
  { name: "Super Mario Maker", image: "super_mario_maker.png", stats: {} },
  { name: "Suzaku Castle", image: "suzaku_castle.png", stats: {} },
  { name: "Midgar", image: "midgar.png", stats: {} },
  { name: "Umbra Clock Tower", image: "umbra_clock_tower.png", stats: {} },
  { name: "New Donk City Hall", image: "new_donk_city_hall.png", stats: {} },
  { name: "Great Plateau Tower", image: "great_plateau_tower.png", stats: {} },
  { name: "Moray Towers", image: "moray_towers.png", stats: {} },
  { name: "Dracula's Castle", image: "draculas_castle.png", stats: {} },
  { name: "Mementos", image: "mementos.png", stats: {} },
  { name: "Yggdrasil's Altar", image: "yggdrasils_altar.png", stats: {} },
  { name: "Spiral Mountain", image: "spiral_mountain.png", stats: {} },
  { name: "King of Fighters Stadium", image: "king_of_fighters_stadium.png", stats: {} },
  { name: "Garreg Mach Monastery", image: "garreg_mach_monastery.png", stats: {} },
  { name: "Spring Stadium", image: "spring_stadium.png", stats: {} },
  { name: "Minecraft World", image: "minecraft_world.png", stats: {} },
  { name: "Northern Cave", image: "northern_cave.png", stats: {} },
  { name: "Cloud Sea of Alrest", image: "cloud_sea_of_alrest.png", stats: {} },
  { name: "Mishima Dojo", image: "mishima_dojo.png", stats: {} },
  { name: "Hollow Bastion", image: "hollow_bastion.png", stats: {} }
])

defineProps<{
  selectedCharacters: Character[]
  selectedLocations: Location[]
}>()

const selectedCharacters = ref<Character[]>([])

function handleDragStart(event: DragEvent, character: Character) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('characterName', character.name)
    if (event.target instanceof HTMLElement) {
      event.target.classList.add('dragging')
    }
  }
}

function handleDragEnd(event: DragEvent) {
  if (event.target instanceof HTMLElement) {
    event.target.classList.remove('dragging')
  }
}

const selectedLocations = ref<Location[]>([])

function toggleLocation(location: Location) {
  const index = selectedLocations.value.findIndex(l => l.name === location.name)
  if (index === -1) {
    if (selectedLocations.value.length < 5) {
      selectedLocations.value.push(location)
    }
  } else {
    selectedLocations.value.splice(index, 1)
  }
}






// const locations = [
//   "Final Destination", "Battlefield", "Smashville", "Pokemon Stadium 2",
//   "Town and City", "Lylat Cruise", "Yoshi's Island", "Kalos League",
//   "WarioWare Inc", "Dream Land", "Castle Siege", "Frigate Orpheon"
// ]

// const selectedLocations = ref<string[]>([])

// function toggleLocation(stage: string) {
//   const index = selectedLocations.value.indexOf(stage)
//   if (index === -1) {
//     if (selectedLocations.value.length < 5) {
//       selectedLocations.value.push(stage)
//     }
//   } else {
//     selectedLocations.value.splice(index, 1)
//   }
// }

// const characters = [
//   "Mario", "Donkey Kong", "Link", "Samus", "Dark Samus", "Yoshi", "Kirby", "Fox", "Pikachu", "Luigi",
//   "Ness", "Captain Falcon", "Jigglypuff", "Peach", "Daisy", "Bowser", "Ice Climbers", "Sheik", "Zelda", "Dr. Mario",
//   "Pichu", "Falco", "Marth", "Lucina", "Young Link", "Ganondorf", "Mewtwo", "Roy", "Chrom", "Mr. Game & Watch",
//   "Meta Knight", "Pit", "Dark Pit", "Zero Suit Samus", "Wario", "Snake", "Ike", "Pokemon Trainer", "Diddy Kong", "Lucas",
//   "Sonic", "King Dedede", "Olimar", "Lucario", "R.O.B.", "Toon Link", "Wolf", "Villager", "Mega Man", "Wii Fit Trainer",
//   "Rosalina & Luma", "Little Mac", "Greninja", "Palutena", "Pac-Man", "Robin", "Shulk", "Bowser Jr.", "Duck Hunt Duo", "Ryu",
//   "Ken", "Cloud", "Corrin", "Bayonetta", "Inkling", "Ridley", "Simon", "Richter", "King K. Rool", "Isabelle", "Incineroar",
//   "Piranha Plant", "Joker", "Hero", "Banjo & Kazooie", "Terry", "Byleth", "Min Min", "Steve", "Sephiroth", "Pyra/Mythra",
//   "Kazuya", "Sora", "Mii Brawler", "Mii Swordfighter", "Mii Gunner, Random"
// ]

// const selectedCharacters = ref<string[]>([])

// function handleDragStart(event: DragEvent, character: string) {
//   if (event.dataTransfer) {
//     event.dataTransfer.setData('character', character)
//     if (event.target instanceof HTMLElement) {
//       event.target.classList.add('dragging')
//     }
//   }
// }

// function handleDragEnd(event: DragEvent) {
//   if (event.target instanceof HTMLElement) {
//     event.target.classList.remove('dragging')
//   }
// }



// const isPlayer1 = route.path.includes('player1')

// function lockIn() {
//   const playerNum = isPlayer1 ? 1 : 2
//   store.setPlayerData(playerNum, [...selectedCharacters.value], [...selectedLocations.value])

//   if (isPlayer1) {
//     router.push('/setup/player2')
//   } else {
//     router.push('/game')
//   }
// }
</script>







<style scoped>
.v-btn.dragging {
  opacity: 0.5;
}

.v-row {
  margin: 10px;
  justify-content: start;
}

.setup-wrapper {
  justify-content: start;
}


</style>
