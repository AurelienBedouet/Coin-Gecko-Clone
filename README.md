# CoinWatch | React Js / Tailwind CSS / Firebase

### React Js App displaying the top 100 Cryptocurrencies by Market Cap. It also renders the top 7 Trending Coins on the homepage. The data is fetched from the Coin Gecko API. This app has an authentication feature allowing the user to create an account. He can then add his favorite coins to his watch list.

### Live demo : https://coinwatch.aurelien-bedouet.com

### In this app i used:
- The useContext hook for the dark/light themes and the user authentication
- React Router to handle the navigation
- axios to fetch the data from the coin gecko API
- Firebase for the user authentication and to store the user's data (in this case the coins stored in the watchlist)
- the react-icons library for the icons
- react-sparklines for the sparklines
- react-paginate for the pagination
- DOMPurify to "sanitize" the HTML received through the coin gecko API on the Coin Pages (description)
