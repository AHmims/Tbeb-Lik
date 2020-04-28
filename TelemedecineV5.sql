/*==============================================================*/
/* Nom de SGBD :  MySQL 5.0                                     */
/* Date de création :  4/21/2020 3:32:29 PM                     */
/*==============================================================*/


drop table if exists ADMIN;

drop table if exists CERTIFICATION_MEDICAL;

drop table if exists CONSULTATION;

drop table if exists MEDECIN;

drop table if exists ORDONNANCE;

drop table if exists PATIENT;

drop table if exists SPECIALITES;

/*==============================================================*/
/* Table : ADMIN                                                */
/*==============================================================*/
create table ADMIN
(
   ID_ADMIN             int not null,
   EMAIL                char(250),
   PASSWORD             char(250),
   primary key (ID_ADMIN)
);

/*==============================================================*/
/* Table : CERTIFICATION_MEDICAL                                */
/*==============================================================*/
create table CERTIFICATION_MEDICAL
(
   ID                   int not null,
   DOCUMENT             longblob,
   primary key (ID)
);

/*==============================================================*/
/* Table : CONSULTATION                                         */
/*==============================================================*/
create table CONSULTATION
(
   MATRICULE_PAT        char(250) not null,
   MATRICULE            char(250) not null,
   ID_CNSLT             int,
   CODE_REF             char(250),
   JOUR_REPOS           int,
   MOTIF                text,
   ATC                  text,
   TYPE                 int,
   DATE_CONSULTATION    datetime,
   ID_PIECE             int,
   ID                  int,
   ETAT              boolean,
   primary key (ID_CNSLT)
);

/*==============================================================*/
/* Table : MEDECIN                                              */
/*==============================================================*/
create table MEDECIN
(
   MATRICULE            char(250) not null,
   ID_SPEC              int not null,
   ID_ADMIN             int not null,
   NOM_MED              char(250),
   TEL                  char(250),
   EMAIL                char(250),
   DISPONIBLE           bool,
   VILLE                char(250),
   primary key (MATRICULE)
);

/*==============================================================*/
/* Table : ORDONNANCE                                           */
/*==============================================================*/
create table ORDONNANCE
(
   ID_ord                 int not null,
   DOCUMENT             longblob,
   primary key (ID_ord)
);

/*==============================================================*/
/* Table : PATIENT                                              */
/*==============================================================*/
create table PATIENTS
(
   CIN                 char(250),
   MATRICULE_PAT       char(250) not null,
   NOM_PAT             char(250),
   Prenom_PAT          char(250),
   PASSWORD            char(250),
   Date_Emb            Date,
   Date_Naissence      Date,
   Tel                 char(250),
   ADRESS              char(250),
   Date_Retrait        Date,
   Direction           char(250),
   Genre               char(250),
   primary key (MATRICULE_PAT)
);

/*==============================================================*/
/* Table : SPECIALITES                                          */
/*==============================================================*/
create table SPECIALITES
(
   ID_SPEC              int not null,
   NOM_SPEC             char(250),
   primary key (ID_SPEC)
);

create table room(

    id int not null,
    Matricule_Pat char(250),
    Matricule_Med char(250),
    Date_Debut Datetime,
    Date_Fin Datetime,
    primary key(id)

);

create table Message(
    id int not null,
    Matricule_emmeter char(250) not null, 
    contenu text,
    id_room int,
    date_envoi datetime,
    type text,
    id_pieceJointes int,
    primary key(id)

);
CREATE TABLE IF NOT EXISTS `type_repos` (
  `ID_TYPE` int NOT NULL,
  `DESCRIPTION` char(250) DEFAULT NULL,
  PRIMARY KEY (`ID_TYPE`)
);

alter table CONSULTATION add constraint FK_CONSULTATION7 foreign key (TYPE)
      references type_repos (ID_TYPE) on delete restrict on update restrict;
      
alter table room add constraint FK_CONSULTATION6 foreign key (Matricule_Pat)
      references PATIENTS (MATRICULE_PAT) on delete restrict on update restrict;
      
alter table room add constraint FK_CONSULTATION5 foreign key (Matricule_Med)
      references MEDECIN (MATRICULE) on delete restrict on update restrict;
      
alter table Message add constraint FK_CONSULTATION4 foreign key (id_room)
      references room(id) on delete restrict on update restrict;      
      
alter table CONSULTATION add constraint FK_CONSULTATION3 foreign key (MATRICULE)
      references MEDECIN (MATRICULE) on delete restrict on update restrict;

alter table CONSULTATION add constraint FK_CONSULTATION2 foreign key (MATRICULE_PAT)
      references PATIENTS (MATRICULE_PAT) on delete restrict on update restrict;

alter table MEDECIN add constraint FK_AJOUTER foreign key (ID_ADMIN)
      references ADMIN (ID_ADMIN) on delete restrict on update restrict;

alter table MEDECIN add constraint FK_CONTIENT foreign key (ID_SPEC)
      references SPECIALITES (ID_SPEC) on delete restrict on update restrict;
      
alter table CONSULTATION add constraint FK_CONTIENT2 foreign key (ID)
      references CERTIFICATION_MEDICAL (ID) on delete restrict on update restrict;
      
alter table CONSULTATION add constraint FK_CONTIENT3 foreign key (ID_PIECE)
      references ORDONNANCE (ID_ord) on delete restrict on update restrict;

