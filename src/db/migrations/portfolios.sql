CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    ministry_id UUID REFERENCES ministries(id),
    managing_entity TEXT,
    responsible_person TEXT,
    code VARCHAR(20),
    allocated_ae NUMERIC,
    allocated_cp NUMERIC,
    status TEXT CHECK (status IN ('draft', 'active', 'archived')) DEFAULT 'draft',
    description TEXT
);

INSERT INTO portfolios (id, name, code, ministry_id, allocated_ae, allocated_cp, status, description, managing_entity, responsible_person) VALUES
    ('398c7dae-9d3a-4f81-a5f0-59165a426ae9', 'Présidence de la République', 'PRF-001', '66f58abe-6c51-4eb6-81bc-58f44ddaa4b2', '68573110000', '74413914000', 'active', null, null, null),
    ('7eedc741-d483-4b4d-9e70-4914477606e7', 'Services du Premier Ministre', 'PRF-002', '7eebd9fd-816a-4135-9fe8-b413e3cc997a', '14011518000', '41730090000', 'active', null, null, null),
    ('b244abf3-90bd-43b7-90da-d3ea1f2c35ee', 'Défense Nationale', 'PRF-003', 'afa92087-b61e-4748-a9fc-ef4add0580e2', '3349514000000', '3349514000000', 'active', null, null, null),
    ('e2bf83e6-2f5e-4b6b-bdaf-341779d34ccc', 'Affaires Etrangères, Communauté Nationale à l''Etranger et Affaires Africaines', 'PRF-004', '480b491b-052f-4d8a-96a6-b06e23b2bb14', '72179390000', '74557390000', 'active', 'Affaires étrangères, communauté nationale à l"étranger et affaires africaines', null, null),
    ('7f2a3da1-99a0-4dc5-8589-5b8490785e7c', 'Intérieur, Collectivités Locales et Aménagement du Territoire', 'PRF-005', '32718f95-540f-472c-af72-e1ad29ccb982', '1365834086000', '1389139586000', 'active', null, null, null),
    ('c3f402e9-6d52-410c-9fd3-ce933cd2732f', 'Justice', 'PRF-006', '65aad606-cd27-4290-9154-07fb8477e1b6', '168988258000', '167307100000', 'active', null, null, null),
    ('60f2c159-689d-41bc-88ba-c46e6858e158', 'Finances', 'PRF-007', '0c476b47-ac8b-4262-9eb4-9f121cc1ecf1', '3635807842000', '3633448042000', 'active', null, null, null),
    ('aae4a43b-bf92-41ce-a3e3-771a3ddb5bfa', 'Energie, Mines et Energies Renouvelables', 'PRF-008', '07d625e3-ac56-4bd0-9f2c-9ad0c053e934', '171097080000', '178259550000', 'active', null, null, null),
    ('68712e0f-06f3-4829-91f7-cdeeb53bcb5d', 'Moudjahidine et Ayants Droits', 'PRF-009', 'c95ceaf9-fb59-4009-89e2-b69ac53bf99f', '2198795500000', '2198795500000', 'active', null, null, null),
    ('acda81a5-9096-43e4-9f7b-b6323753da92', 'Affaires Religieuses et Wakfs', 'PRF-010', '9d7abf27-35f2-4445-ac27-b68b4b0c9bfd', '251006273000', '251643046000', 'active', 'Affaires religieuses et wakfs', null, null),
    ('a1101f2f-ffc5-4c30-95b3-cb5860be5593', 'Education Nationale', 'PRF-011', 'b624c68f-9a7a-43cf-9fb7-85ab4d468b27', '1645254921000', '1716174921000', 'active', null, null, null),
    ('07bbd7d0-1ed0-4a45-88f4-b35d4570d3be', 'Enseignement Supérieur et Recherche Scientifique', 'PRF-012', 'd226e11b-3b82-4f3c-9769-5d448ebf00ae', '736385690000', '776032690000', 'active', null, null, null),
    ('198419c3-5fc1-4cc5-8545-fd933aa9fe32', 'Formation et Enseignement Professionnels', 'PRF-013', 'cdeb8109-5fd7-47b2-82a7-a4c10148ec0e', '103384130000', '104453787000', 'active', null, null, null),
    ('577320eb-2929-4d49-8d42-c320aafd5e27', 'Culture et Arts', 'PRF-014', 'ab50a7ba-2ccf-4756-b046-81d6beadda75', '37981183000', '41554757000', 'active', null, null, null),
    ('4ac9810b-29f8-4fc6-acc7-1982ce5cfe13', 'Sports', 'PRF-015', '5212c2ce-08b0-4fd5-9443-58df8a26daf2', '21779430000', '21779430000', 'active', null, null, null),
    ('94286361-3927-4ab6-9f6d-361a7a0130d2', 'Poste et Télécommunications', 'PRF-017', '31e460cd-7c84-483f-8561-5dce104d6b6e', '83689173000', '91391639000', 'active', null, null, null),
    ('441f8cd9-b9ba-4dd3-a2fb-a75b92b694b5', 'Solidarité Nationale, Famille et Condition de la Femme', 'PRF-018', '1ca0a183-bb96-43ee-9e89-7fc9e3e4330a', '243754297000', '244677025000', 'active', null, null, null),
    ('b536f770-c6d3-41ac-87f6-a881d33709a4', 'Industrie et Production Pharmaceutique', 'PRF-019', '0feb88bc-dbf0-4080-aae3-b6584b634f8b', '732283403000', '802103937000', 'active', null, null, null),
    ('a59f4b88-dcd7-4115-8352-32a62b631e28', 'Agriculture, Développement Rural et Pêche', 'PRF-020', 'e356bde9-28bf-4e6e-a4d2-9065a8439296', '450264441000', '540572249000', 'active', 'Agriculture, développement rural et pêche', null, null),
    ('349243fb-eb50-4240-a1ff-b6525ff16500', 'Habitat, Urbanisme et Ville', 'PRF-021', 'ada2c974-4cd7-40c2-a5e6-20a8ef55ebca', '657000000', '657000000', 'active', null, null, null),
    ('31942608-3949-4163-bd48-6c8419478a23', 'Commerce Intérieur et Régulation du Marché National', 'PRF-022', '041cfce7-eedb-408e-90de-ac92f6611696', '605000000', '605000000', 'active', 'Commerce intérieur et régulation du marché national', null, null),
    ('a35fd904-d2a2-4552-84d9-8c921dd75b20', 'Communication', 'PRF-023', '31e460cd-7c84-483f-8561-5dce104d6b6e', '125092093000', '125424193000', 'active', 'Communication', null, null),
    ('584503c4-9f64-4cad-809f-5d6c44fe4cbb', 'Travaux Publics et Infrastructures de Base', 'PRF-024', '17f662d1-754f-43d8-a8c8-d2b0e97c4356', '189554093000', '198105859000', 'active', null, null, null),
    ('7d25e690-66fb-4cbc-97a1-6d9585de2c0e', 'Transports', 'PRF-025', '1e86897d-a003-4935-942c-e70c153848ec', '42954226000', '75632626000', 'active', null, null, null),
    ('ad18d997-3719-485f-b494-4e1f22b5e53c', 'Tourisme et Artisanat', 'PRF-026', '0c2db0f3-d1eb-4e03-aa36-7a3f4e70f9f0', '19944452000', '29344452000', 'active', null, null, null),
    ('2cf652c6-536b-4683-9e91-e0775f766873', 'Santé', 'PRF-027', '80da0ce9-4412-4e3e-9f75-2b6560428f8f', '1004413554000', '1040992554000', 'active', null, null, null),
    ('8f56ef1d-6fbb-462b-9a5f-114a72266b3a', 'Travail, Emploi et Sécurité Sociale', 'PRF-028', '84ad7cde-b5af-44dd-b3c3-59c3856bcca2', '475269703000', '475369703000', 'active', null, null, null),
    ('d5dcc8a7-0875-4ede-9945-ca35e59e5cac', 'Relations avec le Parlement', 'PRF-029', '34f8bf2b-a020-469f-9351-841b32da7fd6', '613000000', '622000000', 'active', null, null, null),
    ('9737d89c-d19b-44a4-9fbc-0aad18bdba29', 'Environnement et Qualité de la Vie', 'PRF-030', 'c4694af4-b6dd-4512-bd47-750410f4c44d', '613000000', '622000000', 'active', null, null, null),
    ('f511e031-557a-428a-8026-b91a1b81c3b9', 'Economie de la Connaissance, Start-up et Micro-Entreprises', 'PRF-033', '67cc3e55-e422-4c06-9e8c-0c0e9ad0ef58', '6612290000', '11141990000', 'active', null, null, null),
    ('d0bf1234-a5a2-4f01-8fe0-0cae5ceabc57', 'Hydraulique', 'PRF-051', '89ba5f7d-dcd5-4863-9735-d67b1a1d3fec', '310837737000', '318710950000', 'active', null, null, null),
    ('006d2873-db18-42bb-90ab-5c157ec352ca', 'Jeunesse', 'PRF-052', 'cf086abd-d853-4f01-8592-79ea48e1f127', '31013694000', '32362928000', 'active', null, null, null),
    ('8d84ea0c-a667-4df3-9cf8-cf7913bdcf26', 'Commerce Extérieur et Promotion des Exportations', 'PRF-053', '4aa8af5d-4173-438f-8bee-ca3954dbf55c', '52000000', '52000000', 'active', 'Commerce extérieur et promotion des exportations', null, null),
    ('f89a72a3-4eee-4028-8487-b6fc90825414', 'Assemblée Populaire Nationale', 'PRF-500', '39080ab4-53e6-4f91-9b2c-c4ba5f416e72', '780540000', '906984000', 'active', null, null, null),
    ('1fe942bc-018f-4828-bf2f-2fd54b42b141', 'Conseil de la Nation', 'PRF-501', '19d34e7f-35e0-4e65-a3bb-ba03d24ae483', '3884712000', '5884712000', 'active', null, null, null),
    ('f89a72a3-4eee-4028-8487-b6fc90825415', 'Cour Constitutionnelle', 'PRF-505', 'f06f899b-b5ce-4090-98ab-639b8442d052', '780540000', '906984000', 'active', null, null, null),
    ('1fe942bc-018f-4828-bf2f-2fd54b42b142', 'Cour Suprême', 'PRF-502', '4b80853b-1a44-49b9-9cdb-f7077db555d7', '3884712000', '5884712000', 'active', null, null, null),
    ('51f88a17-c1ff-4c7c-8e70-0b719e724eee', 'Conseil d''état', 'PRF-503', '80c3e210-fa54-4e4f-bb39-1a251905e1a8', '1331414000', '1346614000', 'active', '', null, null),
    ('6e4cbb7c-0883-47b3-a09d-2a9f956fe232', 'Conseil Supérieur de la Magistrature', 'PRF-504', '7fec8310-3abf-49c6-90ac-f303a0859c2a', '510000000', '310000000', 'active', null, null, null),
    ('18755c04-9a30-464c-bdc8-8cdd1585c26c', 'Cour des Comptes', 'PRF-506', 'c10f25ce-d5f3-4fbf-a3ad-eaf5e660207f', '1681586000', '1654515000', 'active', null, null, null),
    ('93241027-d530-4d1a-9cfe-cb8e0d74b3eb', 'Haute Autorité de Transparence, de Prévention et de Lutte Contre la Corruption', 'PRF-507', '3292ee1c-8b28-46a1-a303-18529ff1053a', '400480000', '450480000', 'active', null, null, null),
    ('b7a0d61d-a5b1-4a67-ae4e-46c31eb8c3a7', 'Autorité Nationale Indépendante des Elections', 'PRF-508', '78a39bbc-c2d0-4d59-b05a-4499dd21171f', '4691180000', '4091180000', 'active', 'Autorité nationale indépendante des élections', null, null),
    ('b4ccb712-a11f-43f2-a5b7-f8df79b21d75', 'Conseil National Economique, Social et Environnemental', 'PRF-509', '1bfc9b4b-f5e5-41c3-9350-161ad4862208', '887139000', '917139000', 'active', null, null, null),
    ('ac428d70-568a-45ee-a5d2-226ea9ddc1d3', 'Haut Conseil Islamique', 'PRF-510', '146f34b9-fa49-49f6-89a5-d2abc5cc8a25', '191205000', '191205000', 'active', null, null, null),
    ('5735ee06-381d-47fa-b3fd-717382d3579f', 'Haut Conseil de la Langue Arabe', 'PRF-511', '35bebe4f-4fcb-47c4-901e-4b3bc7b96ee4', '437396000', '437396000', 'active', null, null, null),
    ('c44e3b0f-4b5b-46fa-a0ff-af1b96900dbb', 'Conseil National des Droits de l''Homme', 'PRF-512', '9df14c2c-15ac-4f6b-9334-6e8a1858bd1b', '258540000', '258540000', 'active', null, null, null),
    ('06b69f63-892d-43ff-a426-98415c868bcf', 'Académie Algérienne des Sciences et des Technologies', 'PRF-513', 'bd8fe809-c3ee-45d2-ad66-937f6e77f292', '284403000', '284403000', 'active', 'Académie algérienne des sciences et des technologies', null, null),
    ('df95e119-418f-4f3b-9328-24a3e56a2add', 'Conseil National de la Recherche Scientifique et des Technologies', 'PRF-514', 'c5ee78eb-d947-4ddc-922b-a615dd07c334', '224472000', '224472000', 'active', null, null, null),
    ('354c643d-ad38-4dbf-a593-b8bc821be939', 'Observatoire National de la Société Civile', 'PRF-515', '633a15a0-787d-4a8c-b32e-9117dbe700df', '415150000', '415150000', 'active', null, null, null),
    ('d22fbe35-db4b-43b6-860a-a3873cb661e3', 'Conseil Superieur de la Jeunesse', 'PRF-516', '715090b3-85fd-4fea-9255-047ee2af8978', '1106335000', '1126235000', 'active', null, null, null);