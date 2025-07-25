import ComponentHTML from './navigation-bar.html';

export default class NavigationBar {
	constructor(args) {
		args.target.innerHTML = ComponentHTML;
		//--------------------------------------------------
		// Constants
		//--------------------------------------------------

		const loginMenu = args.target.querySelector('#loginMenu');
		const userIcon = args.target.querySelector('#userIcon');
		const userDropdown = args.target.querySelector('#userDropdown');
		const loginToken = document.cookie.includes('LoginToken=');
		const userLogOut = args.target.querySelector('#userLogOut');
		const lightDarkMode = args.target.querySelector('#lightDarkMode');
		const userProducts = args.target.querySelector('#userProducts');
		const userCategories = args.target.querySelector('#userCategories');
		const userProfile = args.target.querySelector('#userProfile');
		const userOrders = args.target.querySelector('#userOrders');
		const usersManagement = args.target.querySelector('#usersManagement');
		const userSummary = args.target.querySelector('#userSummary');

		//--------------------------------------------------
		const userName = args.target.querySelector('#userName');
		//--------------------------------------------------
		// Init
		//--------------------------------------------------
		this.#updateShopCartTotalQuantity('shopCardsItemNumber');
		if (args.app.user) {
			const user = JSON.parse(localStorage.getItem('user') || '{}');
			if (user.firstName) {
				userName.innerText = `Welcome, ${user.firstName}`;
			}

			if (args.app.user.roleId === 1) {
				const show = (page) => page?.classList.remove('d-none');
				show(usersManagement);
				show(userCategories);
				show(userProducts);
				show(userSummary);
			} else if (args.app.user.roleId === 2) {
				const show = (page) => page?.classList.remove('d-none');
				show(usersManagement);
				show(userCategories);
				show(userProducts);
			}
		} else {
			userName.innerText = '';
		}
		// If user logged in then do stuff.
		if (loginToken) {
			userIcon.classList.remove('bi-person-lock');
			userIcon.classList.add('bi-person-gear');

			userLogOut.addEventListener('click', () => {
				// clear frontend
				localStorage.removeItem('user');
				args.app.user = null;

				// call api
				args.app.apiLogout((r) => {
					if (r.success) {
						alert(r.message);
						location.hash = '#home';
						location.reload();
					}
				});
			});
		}
		// DEV
		const mobileCategoryIcon = document.querySelector(
			'#mobileCategoryIcon'
		);

		if (
			window.location.hash.startsWith('#products') ||
			window.location.hash.startsWith('#product-detail') ||
			window.location.hash.startsWith('#all-products')
		) {
			mobileCategoryIcon.classList.remove('d-none');
			mobileCategoryIcon.classList.add('d-lg-block');
			mobileCategoryIcon.classList.add('d-xl-none');
		} else {
			mobileCategoryIcon.classList.add('d-none');
		}

		//--------------------------------------------------
		// Event Listeneners
		//--------------------------------------------------
		userProducts.addEventListener('click', () => {
			location.hash = '#products';
		});

		userCategories.addEventListener('click', () => {
			location.hash = '#categories';
		});

		userProfile.addEventListener('click', () => {
			location.hash = '#user-profile';
		});

		userOrders.addEventListener('click', () => {
			location.hash = '#user-order-history';
		});
		usersManagement.addEventListener('click', () => {
			location.hash = '#users-management';
		});
		userSummary.addEventListener('click', () => {
			location.hash = '#user-summary';
		});

		// Light / Dark Mode Toogle.
		lightDarkMode.addEventListener('click', () => {
			const currentTheme =
				document.documentElement.getAttribute('data-bs-theme');

			if (currentTheme === 'dark') {
				document.documentElement.setAttribute('data-bs-theme', 'light');
				localStorage.setItem('dreamPlantsTheme', 'light');
			} else {
				document.documentElement.setAttribute('data-bs-theme', 'dark');
				localStorage.setItem('dreamPlantsTheme', 'dark');
			}
		});

		// If user logged in then make userDropdown Visible else locationhash change to login-page
		loginMenu.addEventListener('click', () => {
			if (loginToken) {
				userDropdown.classList.remove('d-none');
			} else {
				location.hash = '#login';
			}
		});
	}

	#updateShopCartTotalQuantity(targetId = null) {
		const raw = localStorage.getItem('shopcart');
		let totalQuantity = 0;

		if (raw) {
			try {
				const quantities = JSON.parse(raw);
				for (const qty of Object.values(quantities)) {
					if (typeof qty === 'number' && qty > 0) {
						totalQuantity += qty;
					}
				}
			} catch (e) {
				console.warn('Invalid shopcart JSON' + e);
			}
		}

		// Optional DOM update
		if (targetId) {
			const el = document.getElementById(targetId);
			if (el) el.innerHTML = totalQuantity > 0 ? totalQuantity : '';
		}

		return totalQuantity;
	}
}
