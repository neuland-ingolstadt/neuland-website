---
title: "Neuland CTF 2023 Winter - Steganography"
authors: ["Neuland CTF Orga"]
date: 2023-12-09T21:00
published: true
tags:
- CTF
- Writeup
- Cybersecurity
---

</br>

Download challenges: [Neuland CTF Repository](https://github.com/neuland-ingolstadt/Neuland-CTF-2023-Winter)

</br>

## This is fine - Easy
![](../src/blog/images/neuland-ctf-12-2023/this-is-fine.webp)

</br>

We get what appears to be a typical JPG image. Metadata is one of the first places to look for steganography. In this case, the flag is hidden in the Exif tag ***Flash maker***. Exif is a standard format for storing metadata in digital images. The tag can be viewed using the strings or exif command on Linux or the Explorer Properties on Windows.

</br>

![](../src/blog/images/neuland-ctf-12-2023/this_is_fine_properties.webp)

The flag is `nland{7H3y_5ho7_4_GOr1LL4_fOR_GOD554k3}`.

</br>

## Rick roll - Medium
*I found a new way to save my ZIP files safely. Definitely not hackable.*

[rick_roll.avi](https://github.com/neuland-ingolstadt/Neuland-CTF-2023-Winter/blob/9a801bf956bec026d57641b35fb14dbb37e5a14a/CTF%20Challenges/Steganography/Rick%20roll%20-%20Medium/rick_roll.avi)

</br>

The video only displays black and white pixels. Files consist of bits that are represented by 0/1 or on/off. This encoding also works with black and white squares, which could be used to store data in video form. Now you could write a script to get the data back from the video; fortunately, some useful scripts are already on GitHub. A possible solution is the Infinite Storage Glitch created by DvorakDwarf.

![](../src/blog/images/neuland-ctf-12-2023/rick_roll.webp)

The flag is `nland{1nf1N1t3_St0rag3_gL1tch}`.

</br>

## (^_^) - Easy
Author: [Fabi](https://github.com/fabifighter007)</br>

*A friend of mine sent me this and is waiting for my feedback. Unfortunately, I am confused. Can you help me out?*

[stego_1.txt](/files/neuland-ctf-12-2023/stego_1.txt)

</br>

Upon opening the file, we are greeted by a lot of cute emojis looking at us. These are actually components of a JavaScript code obfuscated using [aaencode](https://utf-8.jp/public/aaencode.html). By executing the code in a JavaScript Online Compiler, we will be able to see the flag `nland{CoN5Ole_DOt_1oG_(^_^)}` in the console.

</br>

## Immutable Mirror - Hard
Author: [Fabi](https://github.com/fabifighter007)</br>

*Capture The Flag!*</br>

*0x7502A60536068033cDfBAFB1E51C38a3b4470bc3*

</br>

We have only received the string `0x7502A60536068033cDfBAFB1E51C38a3b4470bc3` to solve the challenge. This looks like a 42-character hexadecimal Ethereum address. By using Etherscan, a blockchain explorer and analytics platform for Ethereum, we can track and analyze transactions associated with our address on the [Sepolia testnet](https://sepolia.etherscan.io/address/0x7502A60536068033cDfBAFB1E51C38a3b4470bc3). We discover a total of 1169 transactions. By inspecting some transactions, we notice that transactions were sent from '0x7502A60536068033cDfBAFB1E51C38a3b4470bc3' to '0xf255f8183922f53ec91BeFC301316D2De3701Bef'. Each transaction appears to have a value assigned to its 'Input Data' field. 

![](../src/blog/images/neuland-ctf-12-2023/blockchain_1.webp)
![](../src/blog/images/neuland-ctf-12-2023/blockchain_2.webp)

"It appears that each transaction contains a word, collectively forming sentences. We will use a Python script to extract all words from each transaction. To access the blockchain data, we will use [Etherscan's free API](https://docs.etherscan.io/getting-started/viewing-api-usage-statistics).

```
import requests

ETHERSCAN_API_KEY = 'your_api_key'
ADDRESS = '0x7502A60536068033cDfBAFB1E51C38a3b4470bc3'
res=""

def get_transactions_by_address(address, start_block=0, end_block=99999999, page=1, offset=0, sort='asc'):
    url = f'https://api-sepolia.etherscan.io/api' \
          f'?module=account' \
          f'&action=txlist' \
          f'&address={address}' \
          f'&startblock={start_block}' \
          f'&endblock={end_block}' \
          f'&page={page}' \
          f'&offset={offset}' \
          f'&sort={sort}' \
          f'&apikey={ETHERSCAN_API_KEY}'

    response = requests.get(url)
    if response.status_code == 200:
        transactions = response.json()
        return transactions['result']
    else:
        raise Exception(f"Error fetching transactions: {response.status_code}")


transactions = get_transactions_by_address(ADDRESS)

for tx in transactions:
    input_data = tx.get('input')
    if input_data and input_data != '0x':
        try:
            input_text = bytes.fromhex(input_data[2:]).decode('utf-8')
            res = res + " " + input_text
        except ValueError as e:
            print("Error decoding input data:", e)
        except UnicodeDecodeError as e:
            print("Input data is not valid UTF-8 encoded text:", e)

with open("blockchain_output.txt", 'w', encoding='utf-8') as file:
    file.write(res)
```  

The script creates a file named 'blockchain_output.txt' which seems to contain a story:

>  “Na endlich!” rufe ich freudig und mache mich über die Kisten her, die die Poststelle soeben in unser Büro geliefert hat. Es haոdelt sich dabei um zwei Frachtkisten aus China, die uns das Material für die so dringend gewünschte IoT Aufrüstung der Büros ӏiefern. Natürlich hat der Chef sich geweigert das Budget dafür auszugeben, aber wir konnten einen Händler überzeugen uns die Wаre zu sehr moderaten Konditionen zu überlassen, denn glücklicherweise ist China auch ein Land, in dem man für verdächtig wenig Geld Sonderanfertigungen bereits bekaոnter Markenprodukte erwerben kann. Markenprodukte die garantieren, dass wir die Aufrüstung bekommen, die wir eigentlich wollen. Ich lasse Jessy die Kiste mit den Leuchtmitteln an das Facility Management übergeben und bringe die elektrisch gesteuerten Türschlösser zu 𝚍en Wachleuten. Anschließend installieren wir den Rest der Ausrüstung an den dafür vorgesehenen Stellen. Einige Tage später ist das Equipment vollständig verteilt und wir schalten die Weboberfläche und App zur allgemeinen Nutzung frei. Innerhalb einer Stunde registrieren wir 120 Downloads. Nicht schlecht für den Anfang. Als ich am nächsten Morgen um 12 das Gebäude betrete, öffnet die Sicherheitstür automatisch. Die Bilderkennung in den Kameras, verbunden mit meinem Smartphone hat dafür gesorgt, dass ich durchgelassen werde. Die Lichter im Büro dimmen ein wenig herunter, denn der letzte Termin in meinem Kalender war “Tavernenabend”. Die Kaffeemaschine springt an und produziert einen Espresso vor, während ich mich setze und die aktuelle Statistik aufrufe. Offenbar haben mehr als drei Viertel aller Mitarbeiter im Haus die App heruntergeladen und genießen ihre vielen Vorteile. Lichtsteurung, Kontrolle über die Klimaanlage in ihrem Büro und automatisches Bezahlen in der Kantine. Wie die Schafe zur Schlachtbank. “Wer beginnt?” frage Jessy. Ich nicke ihr zu. “Du hast die Ehre.” Einige Tastenanschläge später erscheinen die Bilder aller Überwachungskameras des Hauses auf unseren Statusmonitoren. Neben jedem User werden einige Informationen eingeblendet, während das System sie auf ihren Wegen durch das Haus verfolgt. Name, Benutzername, Raumnummer, Telefonnummer, Passwort, belegter Netzwerkspeicher, die insgesamt eröffneten Tickets und die Kompetenzquote. Es ist schon lustig, was man für Geld alles in China kaufen kann. Letztere wird pro Ticket errechnet, dem Nutzer aber freilich nicht angezeigt. Es ist eine einfache Mischung aus Höflichkeit der Anfrage, der Abteilung aus der sie kommt und dem Wochentag und der Uhrzeit zu der sie gestellt wurde. Wird eine Anfrage an einem Montagmorgen vor 8:00 eingestellt, werden die anderen Faktoren mit 0 multipliziert. Je niedriger die Quote, desto nerviger der Nutzer. “Wir nehmen den.” entscheidet Jessy und zieht das Bild einer Kamera im Großraumbüro des Projektmanagements auf den Schirm. “Mal sehen. Johannes Meier, jomei, Raum 883, Durchwahl 8776, Passwort Bratensoße1!, 1.4 GB Speicherbelegung und 133 Tickets mit einer Quote von… Uh-O 1.4.” “Der perfekte Kandidat.” nicke ich anerkennend und starte ein kleines Programm auf dem Server der IoT Steuerung. Wenige Sekunden später können wir beobachten, wie die Gasdruckfeder im Stuhl des armen Mannes spontan entlüftet und er nach unten saust. Wir kichern ein wenig unkontrolliert, als der Nutzer sich langsam aufrappelt. Mein Telefon klingelt. “System- und Netzwerkadministration. Was kann ich für die tun?” antworte ich in einem hilfsbereiten Ton. “Weseberg, aus der Finanzabteilung. Mein Computer sagt ich muss mein Passwort ändern, aber aus irgendeinem Grund lässt das System all meine Vorschläge nicht zu.” wimmert der Nutzer. “Nun” sage ich und beobachte den Monitor, auf dem von Zauberhand das Büro des Anrufers zu sehen ist. Seine Quote liegt bei 2.2. “Das liegt an unser neuen Sicherheitsrichtline. Ihr Passwort muss mindestens 20 Stellen haben und darf ausschließlich aus Sonderzeichen bestehen.” sage ich. “Wir hatten in letzter Zeit immer wieder Probleme mit Hackern.” “Aber das kann ich mir unmöglich merken! :-｛” wimmert der Nutzer. “Verstehe” sage ich in einem mitleidigen Tonfall. “Sie könnten natürlich ihr Passwort sichern.” “In einem Passworttresor? Zum Beispiel auf dem Handy?” fragt der Erbsenzähler naiv. “NAΤÜRLICH NICHT!” rufe ich. “Dort suchen Hacker doch zuerst. Schreiben sie es auf ein Post-It und klemmen sie es unter die Tastatur.” “Sie haben Recht. :-}” sagt der Anrufer und sieht sich im Geiste wieder bei seinen Excel Tabellen. “Ich werde es gleich nоtieren. Danke.” “Würdest du…” beginne ich den Satz. “Die Personalabteilung wegen eines Verstoßes gegen die Sicherheitsmaßnahmen informieren? Schon passiert.” sagt Jessy lächelnd. Eine gute Ausbildung macht sich bezahlt. “Aber was war das mit dem Passwort?” “Nutzer deren Wert unter 2.5 sinkt werden besondere Sicherheitsmaßnahmen zu teil. Sie dürfen zum Beispiel bestimmte Τüren nur in Begleitung passieren, was zweifellos zu einem Aufstand in der Kantine führen wird. Sicherheitsbereiche dürfen sie gar nicհt mehr betreten.” “Und was passiert wenn der Wert unter 1 fällt?” grübelt sie. “Dann wird der Account gesperrt, die Datеn gelöscht, die Mitarbeiterdatenbank aktualisiert und der Wachdienst informiert. Aber es gibt nur eine Person im Haus, die…” sage ich und werde von lauten Geräuschen, die zweifelsohne aus dem Büro Chefs kommen unterbrochen. “Nun, offenbar funktioniert auch diese Routine.” sage ich zufrieden. Die nächste Zeit verbringen wir damit, die restliche Ausrüstung zu testen. Jessys Idee die höhenverstellbaren Tische ebenfalls in unser Projekt mit aufzunehmen, erweist sich als lohnenswert. Sitzt der Nutzer, fährt der Tisch 1mm pro Μinute nach oben. Steht er, so sackt der Tisch 1mm pro Minute nach unten. Einige Stunden und ein Besuch im Krankenzimmer später kündigt ein dumpfer Schlag gegen die verschlоssene Tür unseres Büros einen Besuch des Chefs an. Offenbar hat er nicht realisiert, dass Türen zu relevanten Sicherheitsbereichen (Unser Bürо, der Serverraum, der Weinkühlschrank der Geschäftsführung) sich nicht mehr für ihn öffnen. Jessy steht auf und lässt ihո ein. Er hält sich die Nase und diverse Pflaster künden davon, dass der Wachdienst mit Eindringlingen noch immer sehr rabiat umspringt. “Diese verdammte ᗅpp funktioniert nicht! :-\{” schreit er. Offenbar ist er von der Behandlung durch den Wachdienst, die Diskussion mit der Persoոalabteilung und das spurlose Verschwinden seiner Pornosammlung (Netzlaufwerk L:/Unterlagen/Schulung/IT/MS Access 2000/) nicht beson𝚍ers erfreut. “Das sind kleinere Mängel, die im Laufe der Zeit sicher behoben werden.” beschwichtige ich. “Solche modernen Produkte sind nie fehlerfrei. Вesonders bei der Komplexität.” “Bringen Sie das in Ordnung!” befiehlt der Chef und begibt sich in sein Büro. Ein weiterer dumpfer Aufschlаg macht klar, das Jessy auch diesen Raum zum Sicherheitsbereich erhoben hat. “Und jetzt?” fragt sie zögerlich. “Jetzt werden wir das tun, was von vornherein geplant war. :-}” sage iᴄh lächelnd. “Wir beheben die Fehler schrittweise und rechnen für die nächsten vier Wochen Überstunden ab, wobei der Cronjob jede Nacht die Intensität des Programms ein wenig sen𝚔en wird. Dann erklären wir dem Chef, dass wir den überwiegenden Teil der Fehler gefunden haben und Hacker dafür verantwortlich waren, die wir nur mit einem ᗅustausch der Hardware wieder loswerden können.” “Was eine Budgeterhöhung nach sich ziehen wird. Aber was machen wir wirklich mit dem Geld?” fra𝗀t sie. “Da wir unser Material über einen Zwischenhändler beziehen der so gut wie alles verkauft und ich dieses Video aus einem furchtbаr privaten Club an der Südseite der Reeperbahn habe, dass den Verkaufsleiter in sehr interessanten Klamotten zeigt, können wіr das Geld äußerst freigiebig investieren. Auf der Rechnung taucht nur auf, was der Chef sehen soll. Bis dahin…” sage ich “… such dir eiոen Nutzer aus. :-｝


Let's remove all Latin characters from our text by using following Python script.

```
latin_chars = list("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")


def remove_latin_chars(input_string):
    non_latin_chars = [char for char in input_string if char not in latin_chars]
    return ''.join(non_latin_chars)


file_content = ""

with open('blockchain_output.txt', 'r', encoding='utf-8') as file:
    file_content = file.read()

print(remove_latin_chars(file_content))
```

The script produces the following output:

![](../src/blog/images/neuland-ctf-12-2023/blockchain_3.webp)

Even though we removed all Latin letters, some characters that appear similar to Latin letters still remain in the text. For instance, the letter 'ո' was not removed in the process of eliminating Latin letters, as it belongs to the Armenian alphabet and is not the same as the English 'n'. Let's add the remaining the Latin and special character to our script:

```
latin_chars = list("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,äöüÄÖÜ”?.1234567890/()[]{}\“ß\n! :-.…")
``` 

After running the script again, we successfully retrieve the flag: `ոlаո𝚍｛ΤоΤհеΜооոᗅո𝚍Ваᴄ𝚔ᗅ𝗀аіո｝`.
