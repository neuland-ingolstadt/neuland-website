---
title: "Cookie Talks und code:together im November 2025"
authors: 
  - name: "Josias Erd"
date: 2025-11-16T20:00
description: "Ein Abend gefüllt mit Vorträgen, Cookies und Code."
tags:
  - code:together
  - Community
  - Cookie Talks
  - Homelab
  - Kubernetes
---

Servus liebe Leserinnen und Leser,

am Mittwoch, den 5. November 2025, fanden die Cookie Talks erstmals kombiniert mit anschließendem code:together statt - und das mit überraschend großem Zulauf.
Für mich ist das der perfekte Anlass, meinen ersten Neuland-Blog-Beitrag zu schreiben.

Die Veranstaltung war dieses Mal so gut besucht, dass viele Interessierte im gefüllten Raum sogar stehend den Vorträgen lauschten, was angesichts des Angebots an Cookies, Spezi und Freibier aber gut zu verschmerzen war.

Die Cookie Talks verbinden kurze, abwechslungsreiche Vorträge mit einer lockeren Atmosphäre und Cookies und bieten jede Menge Stoff zum Mitreden, Diskutieren und Lernen. Kein Wunder also, dass die Mischung nicht nur Neuland-Mitglieder anzieht, sondern inzwischen auch viele andere Informatik-Studierende und Neugierige aus anderen Fakultäten.

![Cookie Talks November 2025](/assets/blog/cookie-talks-code-together-2025-11/2025-11-06_cookie-talks_1.webp)

## Roast my Homelab

Eröffnet wurden die Cookie Talks von Benedikt Schwering, der uns einen Einblick in sein persönliches Homelab-Setup gegeben hat.
Die Zuhörer konnten spannende Einblicke in seine Hardware, die Netzwerkkonfiguration und seine Softwareauswahl gewinnen – und die Diskussionen ließen nicht lange auf sich warten.

Obwohl Benedikts Setup verhältnismäßig klein ist, steckt viel System dahinter: mehrere virtualisierte Dienste, betrieben auf Tiny/Mini/Micro-PCs (DELL Optiplex, HP ProDesk), dazu zwei TrueNAS-Systeme als Netzwerk-Speicher. Über Tailscale integriert er sowohl eine Offsite-Umgebung als auch einen Cloud-Server in sein Netzwerk. Von Paperless-NGX (digitales Dokumentenmanagement) über Nextcloud und Immich bis Outline (Wiki) ist alles dabei, was man für ein modernes, gut organisiertes Homelab braucht.

Das Thema Homelab bietet eine enorme Vielfalt und sollte in Zukunft auf jeden Fall durch weitere Perspektiven und Beispiele anderer Referenten ergänzt werden - meldet euch also gerne als Referenten für die nächsten Talks!

![Cookie Talks November 2025](/assets/blog/cookie-talks-code-together-2025-11/2025-11-06_cookie-talks_2.webp)

## Wie gründe ich einen Verein?

Im zweiten Vortrag ging es weniger um Technik, dafür um ein Thema, das vielen bisher unbekannte Einblicke bot: Alexander Horn berichtete von seinen Erfahrungen bei der Gründung von Neuland.

Thema waren unter anderem die Motivation für die Vereinsgründung, mögliche Fallstricke auf dem Weg dorthin und wichtige Schritte nach der offiziellen Eintragung.

Für alle, die selbst über eine Vereinsgründung nachgedacht haben, war das ein echter Mehrwert.

![Cookie Talks November 2025](/assets/blog/cookie-talks-code-together-2025-11/2025-11-06_cookie-talks_3.webp)

## Vom Commit zum Cluster

Zum Abschluss ging es wieder zurück zur IT, als Robert Eggl uns den Weg zur aktuellen Neuland-IT-Infrastruktur vorstellte.

Angefangen hat es mit einem Azure-VPS (Virtual Private Server), der Anwendungen via Docker hostete. Dieser Ansatz bietet neben seinem simplen Aufbau jedoch eine Reihe an Nachteilen: Es ist begrenzt skalierbar, bietet keine Redundanz (Single Point of Failure) und keine Orchestrierung von Containern.
So führte der Weg zum aktuellen Kubernetes-Cluster, das heute auf drei Hetzner-VPS auf zwei Standorte (Nürnberg, Falkenstein) verteilt gehostet wird und genau diese Schwachstellen behebt.

Das Networking gestaltet sich dank Hetzner-vSwitch denkbar einfach - die 200 Kilometer zwischen Vogtland und Franken-Metropole sind kaum spürbar.
Konfiguriert wird das Cluster via FluxCD und Git, was Änderungen an den Diensten klar strukturiert und effizient macht.
Für Datensicherheit sorgt das verteilte Longhorn-Storage mit regelmäßigen Cloud-Backups via S3-Bucket.
Anwendungen wie Authentik (SSO), Nextcloud, Outline (Wiki), Neuland API, Neuland Next App, Neuland Website und mehr demonstrieren eindrucksvoll die Leistungsfähigkeit des Setups.

An dieser Stelle soll auch noch einmal ein Dank an Hetzner gerichtet werden, die die Infrastruktur und auch das Event gesponsert haben!

Da das Thema Kubernetes und Container-Orchestrierung im Publikum noch wenig verbreitet schien, könnten sich hier zukünftig Workshop-Formate anbieten.

![Cookie Talks November 2025](/assets/blog/cookie-talks-code-together-2025-11/2025-11-06_cookie-talks_4b.webp)

## code:together

Im zweiten Teil des Abends ging es zum code:together über.

Ursprünglich als Möglichkeit gedacht, gemeinsam an privaten, Uni- oder gar an Neuland-Projekten zu programmieren, haben sich die Events zur perfekten Gelegenheit für einen Abend voller Austausch unter Gleichgesinnten entwickelt und sind damit ein wichtiger Beitrag für die Neuland-Community.
Zwischen Pizza, Laptops und Gesprächen entstand schnell eine lockere, produktive Stimmung.

Viele waren so motiviert, dass sich die Veranstaltung erst in der Nacht auflöste.

![Cookie Talks November 2025](/assets/blog/cookie-talks-code-together-2025-11/2025-11-06_cookie-talks_5.webp)

## Ausblick

Das nächste Event "Cookie Talks & code:together" im Dezember ist nach dieser positiven Resonanz auch schon in Aussicht, und zwar am 3.12., Beginn 18 Uhr.
Wir freuen uns, wieder viele bekannte und neue Gesichter zu sehen.
Bringt gerne wieder eure Programmierprojekte mit oder freut euch einfach auf spannende Talks und Cookies.

Und falls ihr selbst Lust auf einen Talk habt: Meldet euch! Ideen sind jederzeit willkommen.

Und damit war es das auch schon von mir.
Ich danke für's Lesen - wir sehen uns in drei Wochen!

![Cookie Talks November 2025](/assets/blog/cookie-talks-code-together-2025-11/2025-10-31_cookie-talks_0.webp)
