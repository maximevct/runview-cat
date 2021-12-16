<template>
  <div>
    <v-dialog
      v-model="isOpen"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="warning"
          v-bind="attrs"
          v-on="on"
        >
          Modifier
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Modifier le chat</v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="currentCat.name"
                    label="Nom"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="currentCat.race"
                    label="Race"
                    required
                  ></v-text-field>
                  <v-select
                    :items="['Mâle', 'Femelle']"
                    v-model="currentCat.sexe"
                    label="Sexe"
                  ></v-select>
                  <v-text-field
                    v-model="currentCat.price"
                    label="Prix"
                    required
                  >
                    <v-icon
                      slot="prepend"
                    >
                      mdi-currency-eur
                    </v-icon>
                  </v-text-field>
                  <v-menu
                    ref="menu"
                    v-model="menuBirthdate"
                    :close-on-content-click="false"
                    :return-value.sync="currentCat.birthdate"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="currentCat.birthdate"
                        label="Date de naissance"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="currentCat.birthdate"
                      no-title
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn
                        text
                        color="primary"
                        @click="menuBirthdate = false"
                      >
                        Annuler
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(currentCat.birthdate)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-textarea
                    v-model="currentCat.comment"
                    label="Commentaire"
                    auto-grow
                    rows="1"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            v-on:click="checkValid">
            Update
          </v-btn>
          <v-btn
            color="danger"
            v-on:click="isOpen = false">
            Annuler
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'CatEdit',
  data: function () {
    return {
      isOpen: false,
      menuBirthdate: false,
      currentCat: { ...this.cat }
    }
  },
  props: ['handler', 'cat'],
  methods: {
    checkValid: function () {
      this.handler({ ...this.currentCat })
      this.isOpen = false
    }
  },
  watch: {
    isOpen: function () {
      this.currentCat = { ...this.cat }
    }
  }
}
</script>
