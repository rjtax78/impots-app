--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: notif_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.notif_type AS ENUM (
    'confirmation',
    'refus',
    'rappel'
);


ALTER TYPE public.notif_type OWNER TO postgres;

--
-- Name: rdv_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.rdv_status AS ENUM (
    'En attente',
    'Accepté',
    'Rejeté'
);


ALTER TYPE public.rdv_status OWNER TO postgres;

--
-- Name: user_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_type AS ENUM (
    'contribiteur',
    'administrateur'
);


ALTER TYPE public.user_type OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contributeur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.contributeur (
    id_contrib integer NOT NULL,
    nif character varying(15) NOT NULL,
    nom character varying(100) NOT NULL,
    adresse text NOT NULL,
    telephone character varying(15) NOT NULL,
    email character varying(100),
    type_contribuable character varying(50) NOT NULL,
    base_imposable numeric(12,2)
);


ALTER TABLE public.contributeur OWNER TO postgres;

--
-- Name: contributeur_id_cinntrib_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.contributeur_id_cinntrib_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.contributeur_id_cinntrib_seq OWNER TO postgres;

--
-- Name: contributeur_id_cinntrib_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.contributeur_id_cinntrib_seq OWNED BY public.contributeur.id_contrib;


--
-- Name: echeancier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.echeancier (
    id_echeance integer NOT NULL,
    nif character varying(15) NOT NULL,
    date_echeance date NOT NULL,
    status character varying(20) DEFAULT 'en attente'::character varying
);


ALTER TABLE public.echeancier OWNER TO postgres;

--
-- Name: echeancier_id_echeance_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.echeancier_id_echeance_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.echeancier_id_echeance_seq OWNER TO postgres;

--
-- Name: echeancier_id_echeance_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.echeancier_id_echeance_seq OWNED BY public.echeancier.id_echeance;


--
-- Name: impot; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.impot (
    id_impot integer NOT NULL,
    nom_impot character varying(100) NOT NULL,
    description text,
    taux numeric(5,2)
);


ALTER TABLE public.impot OWNER TO postgres;

--
-- Name: impot_id_impot_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.impot_id_impot_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.impot_id_impot_seq OWNER TO postgres;

--
-- Name: impot_id_impot_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.impot_id_impot_seq OWNED BY public.impot.id_impot;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    notif_id integer NOT NULL,
    utilisateur_id integer NOT NULL,
    type public.notif_type NOT NULL,
    message text NOT NULL,
    envoye_le timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    is_read boolean DEFAULT false NOT NULL,
    recp_mail character varying(150) NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.notif_id;


--
-- Name: paiement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paiement (
    id_paiement integer NOT NULL,
    nif character varying(15) NOT NULL,
    id_impot integer NOT NULL,
    montant numeric(10,2) NOT NULL,
    date_paiement date,
    is_payed boolean DEFAULT false
);


ALTER TABLE public.paiement OWNER TO postgres;

--
-- Name: paiement_id_paiement_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.paiement_id_paiement_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.paiement_id_paiement_seq OWNER TO postgres;

--
-- Name: paiement_id_paiement_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.paiement_id_paiement_seq OWNED BY public.paiement.id_paiement;


--
-- Name: rendez_vous; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rendez_vous (
    id_rendez_vous integer NOT NULL,
    nif character varying(15) NOT NULL,
    id_utilisateur integer,
    date_rendez_vous timestamp without time zone,
    objet character varying(255) NOT NULL,
    statut public.rdv_status NOT NULL
);


ALTER TABLE public.rendez_vous OWNER TO postgres;

--
-- Name: rendez_vous_id_rendez_vous_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rendez_vous_id_rendez_vous_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rendez_vous_id_rendez_vous_seq OWNER TO postgres;

--
-- Name: rendez_vous_id_rendez_vous_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rendez_vous_id_rendez_vous_seq OWNED BY public.rendez_vous.id_rendez_vous;


--
-- Name: utilisateur; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.utilisateur (
    id_utilisateur integer NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role public.user_type NOT NULL
);


ALTER TABLE public.utilisateur OWNER TO postgres;

--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.utilisateur_id_utilisateur_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.utilisateur_id_utilisateur_seq OWNER TO postgres;

--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.utilisateur_id_utilisateur_seq OWNED BY public.utilisateur.id_utilisateur;


--
-- Name: contributeur id_contrib; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contributeur ALTER COLUMN id_contrib SET DEFAULT nextval('public.contributeur_id_cinntrib_seq'::regclass);


--
-- Name: echeancier id_echeance; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.echeancier ALTER COLUMN id_echeance SET DEFAULT nextval('public.echeancier_id_echeance_seq'::regclass);


--
-- Name: impot id_impot; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.impot ALTER COLUMN id_impot SET DEFAULT nextval('public.impot_id_impot_seq'::regclass);


--
-- Name: notifications notif_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN notif_id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: paiement id_paiement; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiement ALTER COLUMN id_paiement SET DEFAULT nextval('public.paiement_id_paiement_seq'::regclass);


--
-- Name: rendez_vous id_rendez_vous; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rendez_vous ALTER COLUMN id_rendez_vous SET DEFAULT nextval('public.rendez_vous_id_rendez_vous_seq'::regclass);


--
-- Name: utilisateur id_utilisateur; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur ALTER COLUMN id_utilisateur SET DEFAULT nextval('public.utilisateur_id_utilisateur_seq'::regclass);


--
-- Data for Name: contributeur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.contributeur (id_contrib, nif, nom, adresse, telephone, email, type_contribuable, base_imposable) FROM stdin;
3	998877665544332	Beta Technologies	88 Boulevard des Technologies, Marseille	0433221100	info@beta-tech.com	Entreprise	\N
5	556677889900112	Sophie Dubois	17 Rue des Lilas, Nantes	0299887766	sophie.dubois@example.com	Particulier	\N
6	223344556677889	Delta Services	51 Route Nationale, Bordeaux	0533445566	services@delta.com	Entreprise	\N
7	998822334455667	Claude Monet	18 Quai des Arts, Rouen	0722446688	\N	Particulier	\N
8	667788990011223	Omega Systems	76 Parc Technologique, Strasbourg	0388776655	support@omega-sys.com	Entreprise	\N
1	123456789012345	Jean Dupont	123 Rue des Champs, Paris	0612345678	jean.dupont@example.com	Particulier	500000.00
2	112233445566778	Marie Curie	9 Impasse de la Science, Toulouse	0555443322	\N	Particulier	200000.00
28	667788990011276	Lrem ipsum	Toliara 601, Ampasikibo	0343564222	rjtax3466@gmail..com	Entreprise	1000000.00
30	501031027262	Bella pageot	Toliara 601, Besasavy	0387221089	bella@gmail..com	Entreprise	50000.00
31	501031027263	Tahina RJ	Toliara 601, Sanfily	0346669209	rj@gmail..com	Entreprise	20000.00
32	501031027264	Tahina RJ	Toliara 601, Sanfily	0346669208	rjtax@gmail..com	Entreprise	20000.00
33	501031027265	Safidisoa Nirina Albert	Toliara 601, Besasavy	0346669209	fy@gmail..com	Particulier	100000.00
4	776655443322110	Paul Martin	12 Allée des Roses, Nice	0644556677	rjtax3466@gmail.com	Particulier	\N
\.


--
-- Data for Name: echeancier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.echeancier (id_echeance, nif, date_echeance, status) FROM stdin;
29	667788990011276	2024-12-06	en attente
30	501031027264	2025-01-09	en attente
31	501031027265	2025-01-11	en attente
\.


--
-- Data for Name: impot; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.impot (id_impot, nom_impot, description, taux) FROM stdin;
1	Impôt sur le revenu	Impôt payé sur le revenu annuel des individus ou des entreprises.	15.00
2	Taxe sur la valeur ajoutée	Taxe indirecte sur la consommation des biens et services.	18.00
3	Impôt foncier	Impôt basé sur la propriété de biens immobiliers.	10.00
4	Taxe professionnelle	Taxe imposée sur les activités commerciales ou professionnelles.	12.50
5	Impôt sur les sociétés	Impôt sur les bénéfices des entreprises.	25.00
6	Taxe environnementale	Taxe destinée à financer des actions liées à la protection de l'environnement.	5.00
7	Droits de douane	Taxes perçues sur l'importation ou l'exportation de marchandises.	7.50
8	Taxe d'habitation	Taxe locale liée à l'occupation de logements.	8.00
9	Impôt sur les dividendes	Impôt prélevé sur les revenus distribués aux actionnaires.	20.00
10	Taxe sur les véhicules	Taxe annuelle basée sur l'utilisation de véhicules motorisés.	3.50
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (notif_id, utilisateur_id, type, message, envoye_le, is_read, recp_mail) FROM stdin;
\.


--
-- Data for Name: paiement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.paiement (id_paiement, nif, id_impot, montant, date_paiement, is_payed) FROM stdin;
1	501031027262	9	10000.00	\N	t
2	501031027263	9	4000.00	\N	f
3	501031027264	9	4000.00	\N	f
4	501031027265	10	3000.00	\N	f
\.


--
-- Data for Name: rendez_vous; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rendez_vous (id_rendez_vous, nif, id_utilisateur, date_rendez_vous, objet, statut) FROM stdin;
8	501031027264	\N	2024-12-19 00:00:00	Reglement	Accepté
9	501031027264	\N	2024-12-19 00:00:00	Reglement	Accepté
11	501031027264	\N	\N	Reglement	Rejeté
12	501031027264	\N	2024-12-19 00:00:00	Reglement	Accepté
\.


--
-- Data for Name: utilisateur; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.utilisateur (id_utilisateur, email, password, role) FROM stdin;
3	mad.impots@gmail.com	$2b$10$omn42rV/BVGy98/NW1OVoegC5AS29VjsDAE6rZbKJM3IeLK.z4/rW	administrateur
4	rjtax3466@gmail.com	$2b$10$7O6r0aY5FRlZo9phh88gue62Jvuz86bbVK98jsqIS.oTITjgs.W4a	contribiteur
5	fy@gmail.com	$2b$10$DHZNKVX5lb0BlgGzD8A0ZuBpgtYV2JOCmsvXbbU6iKet0qy0qvNRG	contribiteur
\.


--
-- Name: contributeur_id_cinntrib_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.contributeur_id_cinntrib_seq', 33, true);


--
-- Name: echeancier_id_echeance_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.echeancier_id_echeance_seq', 31, true);


--
-- Name: impot_id_impot_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.impot_id_impot_seq', 10, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 21, true);


--
-- Name: paiement_id_paiement_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.paiement_id_paiement_seq', 4, true);


--
-- Name: rendez_vous_id_rendez_vous_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rendez_vous_id_rendez_vous_seq', 12, true);


--
-- Name: utilisateur_id_utilisateur_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.utilisateur_id_utilisateur_seq', 5, true);


--
-- Name: contributeur contributeur_nif_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contributeur
    ADD CONSTRAINT contributeur_nif_key UNIQUE (nif);


--
-- Name: contributeur contributeur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.contributeur
    ADD CONSTRAINT contributeur_pkey PRIMARY KEY (id_contrib);


--
-- Name: echeancier echeancier_nif_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.echeancier
    ADD CONSTRAINT echeancier_nif_key UNIQUE (nif);


--
-- Name: echeancier echeancier_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.echeancier
    ADD CONSTRAINT echeancier_pkey PRIMARY KEY (id_echeance);


--
-- Name: impot impot_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.impot
    ADD CONSTRAINT impot_pkey PRIMARY KEY (id_impot);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notif_id);


--
-- Name: paiement paiement_nif_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiement
    ADD CONSTRAINT paiement_nif_key UNIQUE (nif);


--
-- Name: paiement paiement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiement
    ADD CONSTRAINT paiement_pkey PRIMARY KEY (id_paiement);


--
-- Name: rendez_vous rendez_vous_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rendez_vous
    ADD CONSTRAINT rendez_vous_pkey PRIMARY KEY (id_rendez_vous);


--
-- Name: utilisateur utilisateur_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_email_key UNIQUE (email);


--
-- Name: utilisateur utilisateur_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.utilisateur
    ADD CONSTRAINT utilisateur_pkey PRIMARY KEY (id_utilisateur);


--
-- Name: paiement impot; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paiement
    ADD CONSTRAINT impot FOREIGN KEY (id_impot) REFERENCES public.impot(id_impot);


--
-- Name: echeancier nif; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.echeancier
    ADD CONSTRAINT nif FOREIGN KEY (nif) REFERENCES public.contributeur(nif) ON UPDATE CASCADE NOT VALID;


--
-- Name: notifications notifications_recp_mail_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_recp_mail_fkey FOREIGN KEY (recp_mail) REFERENCES public.utilisateur(email) ON DELETE CASCADE NOT VALID;


--
-- Name: notifications notifications_utilisateur_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_utilisateur_id_fkey FOREIGN KEY (utilisateur_id) REFERENCES public.utilisateur(id_utilisateur) ON DELETE CASCADE;


--
-- Name: rendez_vous utilisateur; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rendez_vous
    ADD CONSTRAINT utilisateur FOREIGN KEY (id_utilisateur) REFERENCES public.utilisateur(id_utilisateur);


--
-- PostgreSQL database dump complete
--

