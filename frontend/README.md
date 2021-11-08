# Szakdolgozat
Egy webalkalmazás, amely nyomonköveti egy-egy kurzus követelményeinek teljesitését oktatók és hallgatók számára.

## Szerepkörök
Csak bejelentkezett felhasználók férhetnek hozzá bármilyen adathoz. A saját adataikat mindig tudják módositani.

### Admin
* Teljes jogosultsága van az adatokhoz, kivéve a felhasználók adatait
* Hozzá tud rendelni más felhasználókat szerepkörökhöz egy-egy kurzus kapcsán

### Hallgató
* Az adott kurzushoz tartozó adatokat csak megtekinteni tudja

### Oktató
* Az adott kurzushoz tartozó összes adatot tudja módositani, kivéve a nevet, azonositót.

## Adatok
### Kurzus
* Azonositó
* Név
* Leirás
* Követelmények
* Eredmények
* Oktatók
* Hallgatók

### Követelmény
* ...

### Eredmény
* ...

### Felhasználó
* Azonositó
* E-mail, jelszó (külön tárolva)
* Admin-e
