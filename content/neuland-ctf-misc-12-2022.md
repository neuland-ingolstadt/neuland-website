---
title: "Neuland CTF 2022 Winter - Miscellaneous"
authors: ["0xFFD700", "manuv"]
date: 2022-12-07T18:02
published: true
tags:
- CTF
- Writeup
- Cybersecurity
---

## Sanity Check - Easy

*If you were here from the start, it's hard to miss the flag. :)*

<br>

Neuland CTF started off with the opening and an introduction. During the introduction we showed what the flags look like and how to submit them. The flag was used for demonstration.

The flag is `nland{w3lc0m3_70_n3ul4nd_c7f}`.

<br>

## Wardriving - Easy

*We've got to secure our perimeter. Evil lurks everywhere, even in our own office (W003).*

<br>

This challenge requires you to walk around the campus. In our office, there’s a router providing an unencrypted `neuland` network. This network is reachable from outside the building. You need to connect to this network and open the gateway IP (`http://192.168.1.1`) in your browser to get the flag.

The flag is `nland{th3-4tt4ck3r-1s-n34rby}`.

<br>

## For the Gains - Medium

*A friend of mine sent me this nucleotide sequence. He told me that the corresponsidng enzyme supposedly supports muscle growth. That's excatly what I need. I need the amino acid sequence for my research and to try it out. Me friend however told me that I will have to work for it. I hope you didn't skip your biology lessions. Can you convert this nucleotide sequence into a amino acid sequence for me?*

*Flag format: nland{Uppercase amino acid sequence}*

<br>

[sequence.txt](/files/neuland-ctf-12-2022/sequence.txt)

<br>

There are two different ways you can approach this task. The first one is a OSINT approach and second one is a programming approach. To start with you will most likely have to read about nucleotide and amino acid sequences first to understand the task at hand.

The OSINT approach would involve using a database like BLAST to search for the provided nucleotide sequence. You can simple upload the text file [here](https://blast.ncbi.nlm.nih.gov/Blast.cgi?PROGRAM=blastn&PAGE_TYPE=BlastSearch&LINK_LOC=blasthome) and BLAST/search. The first sequence has a 100 % identity hit and you can lookup the report for the sequence id [here](https://www.ncbi.nlm.nih.gov/nucleotide/D14059.1?report=genbank&log$=nuclalign&blast_rank=1&RID=SA4RU1DU016). In the CDS portion of the report you will find the translation: 
```
MASKVQLVFLFLFLCAMWASPSAASRDEPNDPMMKRFEEWMAEYGRVYKDDDEKMRRFQIFKNNVKHIETFNSRNENSYTLGINQFTDMTKSEFVAQYTGVSLPLNIEREPVVSFDDVNISAVPQSIDWRDYGAVNEVKNQNPCGSCWSFAAIATVEGIYKIKTGYLVSLSEQEVLDCAVSYGCKGGWVNKAYDFIISNNGVTTEENYPYLAYQGTCNANSFPNSAYITGYSYVRRNDERSMMYAVSNQPIAALIDASENFQYYNGGVFSGPCGTSLNHAITIIGYGQDSSGTKYWIVRNSWGSSWGEGGYVRMARGVSSSSGVCGIAMAPLFPTLQSGANAEVIKMVSET
```

The translation is the amino acid sequence we are looking for. It does belong to the enzyme bromelain which can be found in pineapples. It helps to body to split proteins. Bromelain is used in supplements. However, in the most cases this won't help you gain more muscels. I just picked it for the sake of the challenge.

<br>

The programming approach is to write a short scripts that reads the nucleotide sequence and translates it into the amino acid sequence. The codon table defines the neccessary mappings for the translation. The codon table can be found online. A simple python script that would do the job can be found below:

```python
codon_table = {
    'ATA': 'I', 'ATC': 'I', 'ATT': 'I', 'ATG': 'M',
    'ACA': 'T', 'ACC': 'T', 'ACG': 'T', 'ACT': 'T',
    'AAC': 'N', 'AAT': 'N', 'AAA': 'K', 'AAG': 'K',
    'AGC': 'S', 'AGT': 'S', 'AGA': 'R', 'AGG': 'R',
    'CTA': 'L', 'CTC': 'L', 'CTG': 'L', 'CTT': 'L',
    'CCA': 'P', 'CCC': 'P', 'CCG': 'P', 'CCT': 'P',
    'CAC': 'H', 'CAT': 'H', 'CAA': 'Q', 'CAG': 'Q',
    'CGA': 'R', 'CGC': 'R', 'CGG': 'R', 'CGT': 'R',
    'GTA': 'V', 'GTC': 'V', 'GTG': 'V', 'GTT': 'V',
    'GCA': 'A', 'GCC': 'A', 'GCG': 'A', 'GCT': 'A',
    'GAC': 'D', 'GAT': 'D', 'GAA': 'E', 'GAG': 'E',
    'GGA': 'G', 'GGC': 'G', 'GGG': 'G', 'GGT': 'G',
    'TCA': 'S', 'TCC': 'S', 'TCG': 'S', 'TCT': 'S',
    'TTC': 'F', 'TTT': 'F', 'TTA': 'L', 'TTG': 'L',
    'TAC': 'Y', 'TAT': 'Y', 'TAA': '_', 'TAG': '_',
    'TGC': 'C', 'TGT': 'C', 'TGA': '_', 'TGG': 'W',
}


def dna_to_amino(seq):
    amino_seq = ""
    if len(seq) % 3 == 0:
        for i in range(0, len(seq), 3):
            codon = seq[i:i + 3]
            amino_seq += codon_table[codon]
    return amino_seq


with open("dna_seq.txt", "r") as f:
    print("Amino acid sequence :")
    dna_seq = f.read().replace("\n", "")
    amino_seq = dna_to_amino(dna_seq)
    print(amino_seq)
```

It will print out the same amino acid sequence as the OSINT approach did if you remove the trailing underscore.

The flag is `nland{MASKVQLVFLFLFLCAMWASPSAASRDEPNDPMMKRFEEWMAEYGRVYKDDDEKMRRFQIFKNNVKHIETFNSRNENSYTLGINQFTDMTKSEFVAQYTGVSLPLNIEREPVVSFDDVNISAVPQSIDWRDYGAVNEVKNQNPCGSCWSFAAIATVEGIYKIKTGYLVSLSEQEVLDCAVSYGCKGGWVNKAYDFIISNNGVTTEENYPYLAYQGTCNANSFPNSAYITGYSYVRRNDERSMMYAVSNQPIAALIDASENFQYYNGGVFSGPCGTSLNHAITIIGYGQDSSGTKYWIVRNSWGSSWGEGGYVRMARGVSSSSGVCGIAMAPLFPTLQSGANAEVIKMVSET}`.
