<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card">
				<Button label="Add Event" icon="pi pi-calendar-plus" class="p-mr-2 p-mb-2" @click="addEvent" />
				<FullCalendar :events="events" :options="options" />

				<Dialog v-model:visible="eventDialog" :style="{width: '450px'}" header="Event Details" :modal="true" :closable="true">
					<div class="p-fluid">
						<div class="p-field">
							<label for="title">Title</label>
							<InputText id="title" v-model="event.title" required="true" autofocus/>
							<h1>{{ event.title }}</h1>
						</div>
						<div class="p-field">
							<label for="start">From</label>
							<Calendar id="start" v-model="event.start" :showTime="true" appendTo="body"/>
						</div>
						<div class="p-field">
							<label for="end">To</label>
							<Calendar id="end" v-model="event.end" :showTime="true" appendTo="body"/>
						</div>
						<div class="p-field-checkbox">
							<Checkbox id="allday" name="allday" value="All Day" v-model="event.allDay" />
							<label for="allday">All Day</label>
						</div>
					</div>
					<template #footer>
						<Button label="Save" icon="pi pi-check" class="p-button-text" @click="save"/>
					</template>
				</Dialog>
			</div>
		</div>
	</div>
</template>

<script>
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { mapState, mapActions } from 'vuex'

export default {
	data() {
		return {
			eventDialog: false,
			event: this.createNewEventObject(),
			options: {
				plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
				defaultDate: '2019-01-01',
				header: {
					left: 'prev,next',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				},
				editable: true,
				eventClick: (clicked) => {
					this.event.id = clicked.event.id;
					this.event.title = clicked.event.title;
					this.event.start = clicked.event.start;
					this.event.end = clicked.event.end;
					this.event.allDay = clicked.event.allDay;
					this.clickedEvent = clicked.event;
					this.eventDialog = true;
				},
			},
		};
	},
	created() {
		this.$store.dispatch('fetchEvents')
	},
	computed: mapState(['events']),
	methods: {
		...mapActions(['/fetchEvents', '/createEvent']),
		createEvent() {
			this.$store.dispatch('createEvent', this.newEvent)
		},
		createNewEventObject() {
			const id = Math.floor(Math.random() * 10000000)

			return {
				id: id,
				title: '',
				start: null,
				end: '',
				allDay: null
			}
		},
		findIndexById(id) {
			let index = -1;
			for (let i = 0; i < this.events.length; i++) {
				if (this.events[i].id === id) {
					index = i;
					break;
				}
			}
			return index;
		},
		addEvent() {
			this.event = {};
			this.submitted = false;
			this.eventDialog = true;
		},
		save() {
			this.eventDialog = false;
			this.clickedEvent.setProp('title', this.event.title)
			this.clickedEvent.setStart(this.event.start)
			this.clickedEvent.setEnd(this.event.end)
			this.clickedEvent.setAllDay(this.event.allDay)
			this.$store.dispatch('createEvent')
			this.changedEvent = this.createNewEventObject()
		},
		createId() {
			let id = '';
			var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			for ( var i = 0; i < 5; i++ ) {
				id += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			return id;
		}
	}
}
</script>

<style scoped>
</style>
