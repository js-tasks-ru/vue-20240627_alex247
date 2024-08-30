import { defineComponent, ref, watchEffect } from 'vue';
import { getMeetup } from './meetupsService.ts';

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const selectedMeetupId = ref(1);
    const meetupTitle = ref('');

    const fetchMeetup = async (id) => {
      const data = await getMeetup(id);
      meetupTitle.value = data.title;
    };

    watchEffect(() => {
      fetchMeetup(selectedMeetupId.value);
    });

    return {
      selectedMeetupId,
      meetupTitle,
    };
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" @click="selectedMeetupId--" :disabled="selectedMeetupId === 1">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button" v-for="id in [1, 2, 3, 4, 5]" :key="id">
            <input
              :id="'meetup-id-' + id"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="id"
              v-model="selectedMeetupId"
            />
            <label :for="'meetup-id-' + id" class="radio-group__label">{{ id }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" @click="selectedMeetupId++" :disabled="selectedMeetupId === 5">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ meetupTitle }}</h1>
        </div>
      </div>
    </div>
  `,
});
