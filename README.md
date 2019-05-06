# A frontend részről

## Angular 7 project

Még sok nincs meg a frontend résznél. Eddig amik megvannak:

1. Login oldal
2. Regisztrációs oldal
3. Ha admin-ként van valaki bejelentkezve, akkor az "Update user" menüpont alatti rész
4. Ha user-ként van valaki bejelentkezve, akkor a főoldalon látszik a CNP-je, ami alapján meg lehet őt keresni az admin oldalon


**Login oldal**
A regisztráció során vissza lesz külde a generált "user code". Ezzel lehet bejelentkezni
A "Forgot password" gomb még nem működik


**Regisztrációs oldal**
A regisztrációs oldalon a személy igazolvány adatokat a román személy igazolvány kártyáról(buletin) másoltam, és arról, hogy miket kérnek a hivatalos papírokon. Mivel megnéztem, hogy hogy néz ki a magyar személyi igazolvány, emiatt most leírom, hogy egyes mezőkbe mit kell beírni, azokba, amiket nem láttam a magyar kártyán.

1. CNP - a személyi szám - csak számokat fogad el
2. Serie - A megye kód. Két betűből áll.
3. Nr. - a serie után a személyi igazolvány kártya száma
4. Ki lehet választani a regisztrációnál, hogy milyen felhasználót akarunk létrehozni. Ezt csak azért csináltam, hogy mindenki megnézhesse a két fajta felhasználó lehetőségeit.


**Update user oldal**
A user CNP-je által lehet keresni. Az oldalon ha helyes CNP-at adtunk be, akkor megjeleníti az adott CNP-hez tartozó user adatait. A userhez még csak új contokat lehet hozzárendelni és a firstname-t módosítani, más adatokat még nem lehet lementeni.
