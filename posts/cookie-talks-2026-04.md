---
title: "Cookie Talks im April 2026"
authors: 
  - name: "Josias Erd"
date: 2026-05-05T20:00
description: "Ein Abend rund um Prozessorarchitektur, Linux und Bewerbungsgespräche. Und natürlich mit Cookies."
tags:
  - Community
  - Cookie Talks
  - Linux
  - Intel
  - Software Developer
  - Career
---

Servus liebe Leserinnen und Leser,

nachdem die Cookie Talks im November und Dezember 2025 so gut angenommen wurden, war es nur logisch, dass sie auch in diesem Semester wieder stattfinden müssen. Und so gab es letzte Woche Donnerstag, am 23.04.2026, wieder eine Reihe spannender Vorträge und natürlich reichlich selbstgebackene Cookies.

![Cookie Talks](/assets/blog/cookie-talks-2026-04/2026-04-23_cookie-talks_1.jpg)

## Intel Panther Lake: Next Generation Mobile Processors (Tommaso Albertoni)

Panther Lake – ist das ein See in Florida, in New York oder vielleicht auf Vancouver Island?

Zum Auftakt des Abends führte Tommaso Albertoni die Zuhörer in die Welt der Prozessorarchitekturen und beleuchtete dabei Intels neue Mobile-Chips. Die Antwort auf die vorherige Frage: Alles richtig, aber in diesem Kontext ist es Intels Codename für die Intel Core Ultra Serie 3 für Laptops, gefertigt auf dem neuen Intel 18A Prozess mit RibbonFET-Transistoren.

Nach einer Einführung in die wichtigsten Begriffe ging es zum Kern des Vortrags, nämlich Intels Hybrid-Core-Strategie: Panther Lake kombiniert bis zu vier leistungsstarke P-Kerne (Cougar Cove), acht E-Kerne für parallele Workloads und vier besonders energiesparende LP-E-Kerne für Hintergrundaufgaben (sogar im Standby). Welcher Kern wann zum Einsatz kommt, regelt der Intel Thread Director gemeinsam mit dem OS-Scheduler durch kontinuierliche Telemetrie. Neu ist außerdem die Chiplet-Architektur: Anders als beim Vorgänger Lunar Lake sitzt der Arbeitsspeicher nicht mehr direkt auf dem Package, was mehr Flexibilität bei der Konfiguration ermöglicht – von der kleinen 8-Kern-Variante für Office-Notebooks bis zur 16-Kern-Konfiguration mit 12 Xe3-GPU-Kernen für kreative Anwendungen.

Als kleines Bonus-Thema gab es noch Wildcat Lake, Intels abgespeckte Variante mit maximal 6 Kernen für Chromebooks und Einsteiger-Geräte. Und zum Abschluss stellte sich die Frage: Wie sieht in Hinblick auf aktuelle Ereignisse die Zukunft von Intels GPU-Sparte (Arc-Grafik) aus? Eine Antwort darauf hat bisher noch niemand.

![Tommaso Albertoni: Intel Panther Lake](/assets/blog/cookie-talks-2026-04/2026-04-23_cookie-talks_2.jpg)

## Systemd & Friends: Das neue Fundament der Linux-Distros (Julian Kobylanski)

I'd just like to interject for a moment. What you're refering to as Linux, is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux...

Die Referenz habe ich bereits in einem vorigen Blogbeitrag versteckt, aber auch Julian Kobylanski hielt die bekannte GNU/Linux-Copypasta für einen guten Einstieg in sein Thema rund um das moderne Linux-Betriebssystem. Wer Linux sagt, meint kein reines Kernel-System – die eigentliche Frage ist, welche Komponenten neben dem Kernel das System ausmachen.

Was heute Linux ist, hat viele Altlasten überwinden müssen. Das zeigte Julian anhand eines klassischen SysVinit-Skripts: sequentieller Boot-Prozess, kein automatischer Neustart bei Abstürzen, und jede Menge manuelle Fehlerbehandlung im Shell-Code. Im Vergleich dazu wirkt eine moderne systemd-Unit-Datei geradezu erfrischend kurz: Wenige Zeilen für einen vollständig überwachten Dienst mit automatischem Neustart.

Neben systemd selbst beleuchtete Julian die Standardisierungslandschaft rund um Freedesktop.org: XDG Base Directory Specification, Desktop Entry Specification und natürlich Wayland als Nachfolger von X11. Letzteres hatte Julian besonders auf dem Kieker – X11 stammt aus den frühen 80ern und bringt eine fundamentale Sicherheitslücke mit: Jedes Programm hat vollen Zugriff auf Tastatur und Maus – »Ein kostenloser Keylogger ist bei X11 inklusive«. Wayland löst das durch ein sauberes Protokoll-Design mit deutlich mehr Isolation – auch wenn die gemeinsame Entwicklung manchmal zäh ist. Als Beispiel: 4,5 Jahre und fast 1.000 Nachrichten auf einer Mailingliste, nur um sich auf ein Protokoll zu einigen, womit Programme ihre eigenen Fenster selbst verschieben können.

Zum Abschluss gab Julian einen Ausblick auf die Zukunft: Immutable Distros setzen auf ein schreibgeschütztes Root-Dateisystem und atomare Updates; mittels beispielsweise Flatpak lässt sich Software trotzdem bequem installieren, ganz ohne Admin-Rechte. Auf der Kommunikationsebene steht derweil ein Wechsel bevor: systemd will DBus langfristig durch Varlink ablösen, ein schlankes JSON-basiertes Protokoll ohne zentralen Broker, das sogar bereits während des Bootvorgangs nutzbar ist.

![Julian Kobylanski: Systemd & Friends](/assets/blog/cookie-talks-2026-04/2026-04-23_cookie-talks_3.jpg)

## Bewerbungsgespräche als Softwareentwickler:in (Markus Herhoffer)

Auf was muss ich mich beim Bewerbungsgespräch einstellen? Warum ist die Jobsuche gerade so schwierig? Und wer sind Tim Taschenspieler, Ben Buzzword und Bernd Brüllmann? Die Antworten darauf lieferte das Finale des Abends von Markus Herhoffer mit seinem Vortrag über Bewerbungsgespräche als Softwareentwickler:in.

Markus eröffnete mit einer nüchternen Bestandsaufnahme des aktuellen IT-Arbeitsmarkts: 109.000 offene IT-Stellen stehen 61.000 arbeitslosen ITlern gegenüber – und trotzdem brauchen viele Bewerber bis zu 40 Versuche bis zum ersten Gespräch. Der Grund: KI erledigt bereits heute die Arbeit eines durchschnittlichen Juniors in Minuten, was den Einstieg für Absolventinnen und Absolventen erheblich schwerer macht.

Der Großteil des Vortrags widmete sich dem eigentlichen Prozess und einem Blick hinter die Kulissen. Ein typisches Bewerbungsverfahren läuft in mindestens drei Stufen ab: ein erster Vibecheck mit HR (Softskills und genereller Fit), ein technischer Deepdive mit CTO oder Teamlead, und ein abschließendes Gespräch zu Gehalt und Rahmenbedingungen. Für jede Stufe hat Markus konkrete Tipps mitgebracht, zum Beispiel, bei technischen Fragen lieber laut zu denken und eine Wissenslücke zuzugeben als zu bluffen. Zwischendurch zeigten Anekdoten ein paar abschreckende Beispiele.

Besonders spannend war der Blick auf aktuelle Interviewfragen rund um KI-gestütztes Coding: Was ist dein Workflow mit Coding Agents? Wie verifizierst du KI-generierten Code? Welche Red Flags gibt es? Wer sich auf Stellen im Jahr 2026 bewirbt, sollte auf diese Fragen eine ehrliche und fundierte Antwort haben.

![Markus Herhoffer: Bewerbungsgespräche als Softwareentwickler:in](/assets/blog/cookie-talks-2026-04/2026-04-23_cookie-talks_4.jpg)

## Ausblick

Die nächsten Cookie Talks werden wohl leider erst wieder im Wintersemester 2026/2027 stattfinden. Wer bis dahin spannende Themen für Vorträge hat – egal ob tief technisch, karrierebezogen oder einfach ein Thema, das euch gerade begeistert – kann sich gerne bei uns melden!