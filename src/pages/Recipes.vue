<template>
	<div class="p-grid">
		<div class="p-col-12">
			<div class="card">
				<h4>Default</h4>
				<p>Pagination, sorting, filtering and checkbox selection.</p>
				<DataTable :value="customer1" :paginator="true" class="p-datatable-customers" :rows="10" dataKey="id" :rowHover="true" v-model:selection="selectedCustomers1"
                        :filters="filters1" :loading="loading1">
					<template #header>
						<div class="table-header">
							List of Customers
							<span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global']" placeholder="Global Search" />
                            </span>
						</div>
					</template>
					<template #empty>
						No customers found.
					</template>
					<template #loading>
						Loading customers data. Please wait.
					</template>
					<Column selectionMode="multiple" headerStyle="width: 3em"></Column>
					<Column field="name" header="Name" :sortable="true">
						<template #body="slotProps">
							{{slotProps.data.name}}
						</template>
					</Column>
					<Column header="Country" :sortable="true" sortField="country.name" filterField="country.name">
						<template #body="slotProps">
							<img src="assets/layout/flags/flag_placeholder.png" :alt="slotProps.data.country.name" :class="'flag flag-' + slotProps.data.country.code" width="30" />
							<span style="margin-left: .5em; vertical-align: middle" class="image-text">{{slotProps.data.country.name}}</span>
						</template>
					</Column>
					<Column header="Representative" :sortable="true" sortField="representative.name" filterField="representative.name">
						<template #body="slotProps">
							<img :alt="slotProps.data.representative.name" :src="'assets/layout/images/avatar/' + slotProps.data.representative.image" width="32" style="vertical-align: middle" />
							<span style="margin-left: .5em; vertical-align: middle" class="image-text">{{slotProps.data.representative.name}}</span>
						</template>
					</Column>
					<Column field="date" header="Date" :sortable="true">
						<template #body="slotProps">
							<span>{{slotProps.data.date}}</span>
						</template>
					</Column>
					<Column field="status" header="Status" :sortable="true">
						<template #body="slotProps">
							<span :class="'customer-badge status-' + slotProps.data.status">{{slotProps.data.status}}</span>
						</template>
					</Column>
					<Column field="activity" header="Activity" :sortable="true">
						<template #body="slotProps">
							<ProgressBar :value="slotProps.data.activity" :showValue="false" />
						</template>
					</Column>
					<Column headerStyle="width: 8rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
						<template #body>
							<Button type="button" icon="pi pi-cog" class="p-button-secondary"></Button>
						</template>
					</Column>
				</DataTable>
			</div>
		</div>

		<div class="p-col-12">
			<div class="card">
				<h4>Row Expand</h4>

				<Toast />
				<DataTable :value="products" v-model:expandedRows="expandedRows" class="p-datatable-customers" dataKey="id" @row-expand="onRowExpand" @row-collapse="onRowCollapse" :paginator="true" :rows="10" v-model:selection="selectedRecipes">
					<template #header>
						<div class="table-header-container">
							<!-- Buttons will go here -->
						</div>
					</template>
					<Column selectionMode="multiple" headerStyle="width: 3em"></Column>
					<Column :expander="true" headerStyle="width: 3rem" />
					<Column field="name" header="Name" :sortable="true"></Column>
					<Column field="style" header="Style" :sortable="true"></Column>
					<Column field="category" header="Category" :sortable="true"></Column>
					<Column headerStyle="width: 8rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
						<template #body>
							<Button type="button" icon="pi pi-pencil" class="p-button-secondary"></Button>
						</template>
					</Column>
					<template #expansion="slotProps">
						<div class="orders-subtable">
							<h5>Orders for {{slotProps.data.name}}</h5>
							<DataTable :value="slotProps.data.recipe">
								<Column field="lbs" header="Lbs" :sortable="true"></Column>
								<Column field="grain" header="Ingredient" :sortable="true"></Column>
								<Column field="price" header="Price per Lb" :sortable="true"></Column>
								<!-- <Column field="totalPrice" header="Total Price" :sortable="true"></Column> -->
								<!-- <Column field="inventoryStatus" header="Status" :sortable="true">
									<template #body="slotProps">
										<span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{slotProps.data.inventoryStatus}}</span>
									</template>
								</Column> -->
								<Column headerStyle="width:4rem">
									<template #body>
										<Button icon="pi pi-search" />
									</template>
								</Column>
							</DataTable>
						</div>
					</template>
				</DataTable>
			</div>
		</div>

	</div>
</template>

<script>
	import CustomerService from "../service/CustomerService";
	import ProductService from '../service/ProductService';

	export default {
		data() {
			return {
				customer1: null,
				customer2: null,
				customer3: null,
				selectedRecipes: null,
				selectedCustomers1: null,
				selectedCustomers2: null,
				filters1: {},
				filters2: {},
				loading1: true,
				loading2: true,
				products: null,
				expandedRows: []
			}
		},
		customerService: null,
		productService: null,
		created() {
			this.customerService = new CustomerService();
			this.productService = new ProductService();
		},
		mounted() {
			this.productService.getRecipes().then(data => this.products = data);
			this.customerService.getCustomersMedium().then(data => this.customer1 = data);
			this.customerService.getCustomersLarge().then(data => this.customer2 = data);
			this.customerService.getCustomersMedium().then(data => this.customer3 = data);
			this.loading1 = false;
			this.loading2 = false;
		},
		methods: {
			onRowExpand(event) {
				this.$toast.add({severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000});
			},
			onRowCollapse(event) {
				this.$toast.add({severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000});
			},
			expandAll() {
				this.expandedRows = this.products.filter(p => p.id);
				this.$toast.add({severity: 'success', summary: 'All Rows Expanded', life: 3000});
			},
			collapseAll() {
				this.expandedRows = null;
				this.$toast.add({severity: 'success', summary: 'All Rows Collapsed', life: 3000});
			},
			formatCurrency(value) {
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			},
			calculateCustomerTotal(name) {
				let total = 0;

				if (this.customer3) {
					for (let customer of this.customer3) {
						if (customer.representative.name === name) {
							total++;
						}
					}
				}

				return total;
			}
		}
	}
</script>

<style scoped lang="scss">
::v-deep(.p-progressbar) {
	height: .5rem;
	background-color: #D8DADC;

	.p-progressbar-value {
		background-color: #607D8B;
	}
}

.p-datatable .p-column-filter {
	display: none;
}

.table-header {
	display: flex;
	justify-content: space-between;
}

::v-deep(.p-datatable.p-datatable-customers) {
	.p-datatable-header {
		padding: 1rem;
		text-align: left;
		font-size: 1.5rem;
	}

	.p-paginator {
		padding: 1rem;
	}

	.p-datatable-thead > tr > th {
		text-align: left;
	}

	.p-datatable-tbody > tr > td {
		cursor: auto;
	}

	.p-dropdown-label:not(.p-placeholder) {
		text-transform: uppercase;
	}
}

/* Responsive */
.p-datatable-customers .p-datatable-tbody > tr > td .p-column-title {
	display: none;
}

.customer-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.status-qualified {
		background: #C8E6C9;
		color: #256029;
	}

	&.status-unqualified {
		background: #FFCDD2;
		color: #C63737;
	}

	&.status-negotiation {
		background: #FEEDAF;
		color: #8A5340;
	}

	&.status-new {
		background: #B3E5FC;
		color: #23547B;
	}

	&.status-renewal {
		background: #ECCFFF;
		color: #694382;
	}

	&.status-proposal {
		background: #FFD8B2;
		color: #805B36;
	}
}

.p-progressbar-value.ui-widget-header {
	background: #607d8b;
}

@media (max-width: 640px) {
	.p-progressbar {
		margin-top: .5rem;
	}
}

.product-image {
	width: 100px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)
}

.orders-subtable {
	padding: 1rem;
}

.product-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.status-instock {
		background: #C8E6C9;
		color: #256029;
	}

	&.status-outofstock {
		background: #FFCDD2;
		color: #C63737;
	}

	&.status-lowstock {
		background: #FEEDAF;
		color: #8A5340;
	}
}

.order-badge {
	border-radius: 2px;
	padding: .25em .5rem;
	text-transform: uppercase;
	font-weight: 700;
	font-size: 12px;
	letter-spacing: .3px;

	&.order-delivered {
		background: #C8E6C9;
		color: #256029;
	}

	&.order-cancelled {
		background: #FFCDD2;
		color: #C63737;
	}

	&.order-pending {
		background: #FEEDAF;
		color: #8A5340;
	}

	&.order-returned {
		background: #ECCFFF;
		color: #694382;
	}
}

@media screen and (max-width: 960px) {
	::v-deep(.p-datatable) {
		&.p-datatable-customers {
			.p-datatable-thead > tr > th,
			.p-datatable-tfoot > tr > td {
				display: none !important;
			}

			.p-datatable-tbody > tr {
				> td {
					text-align: left;
					display: block;
					border: 0 none !important;
					width: 100% !important;
					float: left;
					clear: left;
					border: 0 none;

					.p-column-title {
						padding: .4rem;
						min-width: 30%;
						display: inline-block;
						margin: -.4rem 1rem -.4rem -.4rem;
						font-weight: bold;
					}

					.p-progressbar {
						margin-top: .5rem;
					}
				}
			}
		}
	}
}
</style>
