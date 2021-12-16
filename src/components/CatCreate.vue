<template>
  <div>
    <v-dialog
      v-model="isOpen"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="success"
          v-bind="attrs"
          v-on="on"
          block
        >
          Créer
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Créer un chat</v-card-title>
        <v-card-text>
          <v-form
            ref="formCreate"
            lazy-validation
          >
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="currentCat.name"
                    label="Nom"
                    required
                    :rules="validateString"
                  ></v-text-field>
                  <v-text-field
                    v-model="currentCat.race"
                    label="Race"
                    required
                    :rules="validateString"
                  ></v-text-field>
                  <v-select
                    :items="['Mâle', 'Femelle']"
                    v-model="currentCat.sexe"
                    label="Sexe"
                    required
                    :rules="validateRace"
                  ></v-select>
                  <v-text-field
                    v-model="currentCat.price"
                    label="Prix"
                    required
                    :rules="validatePrice"
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
                        required
                        :rules="validateDate"
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
            color="success"
            v-on:click="checkValid">
            Créer
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
import moment from 'moment'

export default {
  name: 'CatCreate',
  data: function () {
    return {
      isOpen: false,
      menuBirthdate: false,
      currentCat: { },
      validateString: [
        value => !!value || 'Requis',
        value => (value || '').length <= 50 || 'Longueur Max 50'
      ],
      validateDate: [
        value => !!value || 'Requis',
        value => (moment(value).isBefore(moment()) && moment(value).isAfter(moment().subtract(50, 'years'))) || 'Date invalide'
      ],
      validatePrice: [
        value => !!value || 'Requis',
        value => value >= 0 || 'Doit être positif'
      ],
      validateRace: [
        value => !!value || 'Requis',
        value => ['Mâle', 'Femelle'].indexOf(value) >= 0 || 'Doit être valide'
      ]
    }
  },
  props: ['handler', 'cat'],
  methods: {
    checkValid: function () {
      if (this.$refs.formCreate.validate()) {
        this.handler({ ...this.currentCat })
        this.isOpen = false
      }
    }
  },
  watch: {
    isOpen: function () {
      this.currentCat = { }
    }
  }
}
</script>
