import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HelpPresentation() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <Button variant="ghost" className="mb-4" onClick={() => navigate("/help")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à l'aide
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Présentation du Système</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-4">Introduction</h2>
              <p className="text-muted-foreground">
                Le <strong>S.I.B</strong> est une plateforme web centralisée qui automatise et rationalise les processus de gestion budgétaire. En
                intégrant des données clés et en facilitant leur utilisation, chaque module contribue directement à l'efficacité et à la transparence
                dans la gestion des finances publiques.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Modules et Fonctions dans la Gestion Budgétaire</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="tableau-de-bord">
                  <AccordionTrigger>1. Tableau de Bord</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Rôle :</strong> Donner une vue d'ensemble synthétique de l'état budgétaire.
                      </p>
                      <p>
                        <strong>Fonctions :</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Indicateurs globaux tels que les montants engagés, utilisés, et restants</li>
                        <li>Graphiques pour surveiller les flux budgétaires</li>
                      </ul>
                      <p>
                        <strong>Processus métier :</strong> Facilite la prise de décisions rapides basées sur des données consolidées.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="portefeuille">
                  <AccordionTrigger>2. Portefeuille des Programmes</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Rôle :</strong> Assurer une gestion spécifique des programmes et projets majeurs.
                      </p>
                      <p>
                        <strong>Fonctions :</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Détails des budgets affectés par programme et par action</li>
                        <li>Analyse des taux d'avancement et des écarts</li>
                      </ul>
                      <p>
                        <strong>Processus métier :</strong> Permet l'allocation et le suivi des ressources, garantissant que les objectifs des
                        programmes sont atteints.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="engagements">
                  <AccordionTrigger>3. Engagements</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Rôle :</strong> Traiter les demandes d'engagement budgétaire des entités.
                      </p>
                      <p>
                        <strong>Fonctions :</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Suivi et gestion des fonds engagés pour des projets spécifiques</li>
                        <li>Validation des engagements basés sur les priorités stratégiques</li>
                      </ul>
                      <p>
                        <strong>Processus métier :</strong> Réduit les inefficacités dans l'utilisation des ressources en s'assurant que les
                        engagements sont alignés avec les objectifs.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="paiements">
                  <AccordionTrigger>4. Paiements</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Rôle :</strong> Centraliser et automatiser les paiements approuvés.
                      </p>
                      <p>
                        <strong>Fonctions :</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Gestion des statuts des paiements (en attente, payés, rejetés)</li>
                        <li>Traçabilité complète des transactions</li>
                      </ul>
                      <p>
                        <strong>Processus métier :</strong> Garantit une transparence optimale et réduit les délais dans l'exécution des paiements.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="previsions">
                  <AccordionTrigger>5. Prévisions CP (Crédits de Paiement)</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Rôle :</strong> Anticiper les besoins budgétaires futurs.
                      </p>
                      <p>
                        <strong>Fonctions :</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Préparation des prévisions pour les dépenses potentielles</li>
                        <li>Calcul des taux de mobilisation budgétaire</li>
                      </ul>
                      <p>
                        <strong>Processus métier :</strong> Renforce une gestion proactive, évitant les écarts budgétaires.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="rapports">
                  <AccordionTrigger>6. Rapports et Audits</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Rôle :</strong> Produire des analyses détaillées et assurer le contrôle des finances.
                      </p>
                      <p>
                        <strong>Fonctions :</strong>
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Génération de rapports périodiques (financiers, avancements)</li>
                        <li>Identification des anomalies ou incohérences dans les données</li>
                      </ul>
                      <p>
                        <strong>Processus métier :</strong> Renforce la conformité et l'intégrité financière.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="cycle-budgetaire">
                  <AccordionTrigger>7. Cycle Budgétaire et Modules</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <section>
                        <h3 className="text-lg font-semibold mb-2">Phase de Préparation (n-1)</h3>
                        <p className="text-muted-foreground mb-2">Période : mars à septembre</p>
                        <div className="space-y-2">
                          <p>
                            <strong>Modules concernés :</strong> Portefeuille, Prévisions, Rapports
                          </p>
                          <ul className="list-disc pl-6">
                            <li>Élaboration des propositions budgétaires sectorielles</li>
                            <li>Regroupement des projets par ministère et secteur</li>
                            <li>Alignement sur les priorités nationales</li>
                            <li>Prévision des crédits de paiement nécessaires</li>
                            <li>Production d'analyses statistiques pour les négociations</li>
                          </ul>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold mb-2">Phase d'Adoption (n-1)</h3>
                        <p className="text-muted-foreground mb-2">Période : septembre à décembre</p>
                        <div className="space-y-2">
                          <p>
                            <strong>Modules concernés :</strong> Rapports
                          </p>
                          <ul className="list-disc pl-6">
                            <li>Collecte et consolidation des données budgétaires</li>
                            <li>Génération de rapports détaillés pour les débats parlementaires</li>
                            <li>Préparation de la Loi de Finances</li>
                          </ul>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold mb-2">Phase d'Exécution (année n)</h3>
                        <p className="text-muted-foreground mb-2">Période : janvier à décembre</p>
                        <div className="space-y-2">
                          <p>
                            <strong>Modules concernés :</strong> Programme, Action, Opération, Engagement, Paiement
                          </p>
                          <ul className="list-disc pl-6">
                            <li>Déploiement des budgets votés en programmes opérationnels</li>
                            <li>Détail des actions prévues dans chaque programme</li>
                            <li>Supervision de l'exécution technique des opérations</li>
                            <li>Enregistrement des engagements budgétaires</li>
                            <li>Automatisation des paiements après validation</li>
                          </ul>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold mb-2">Phase de Contrôle et Clôture (n+1)</h3>
                        <p className="text-muted-foreground mb-2">Période : janvier à avril</p>
                        <div className="space-y-2">
                          <p>
                            <strong>Modules concernés :</strong> Rapports et Audits
                          </p>
                          <ul className="list-disc pl-6">
                            <li>Génération de bilans financiers et rapports d'exécution</li>
                            <li>Identification des écarts entre prévisions et dépenses</li>
                            <li>Préparation de la Loi de Règlement</li>
                          </ul>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-lg font-semibold mb-2">Valeur Ajoutée du S.I.B</h3>
                        <ul className="list-disc pl-6">
                          <li>Centralisation des données : Tous les processus budgétaires gérés dans un seul système</li>
                          <li>Transparence financière : Traçabilité complète de chaque dinar</li>
                          <li>Efficacité et agilité : Adaptation rapide aux imprévus grâce aux prévisions en temps réel</li>
                        </ul>
                      </section>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Cycle Global dans le Processus Métier</h2>
              <p className="text-muted-foreground mb-4">
                L'application S.I.B est structurée pour accompagner chaque étape clé de la gestion budgétaire :
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Planification :</strong> Définir des objectifs clairs et des allocations financières
                </li>
                <li>
                  <strong>Exécution :</strong> Traiter les engagements et les paiements nécessaires
                </li>
                <li>
                  <strong>Suivi :</strong> Vérifier l'avancement des projets et l'utilisation des fonds
                </li>
                <li>
                  <strong>Contrôle :</strong> Produire des audits pour garantir la transparence et corriger les écarts
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Synthèse</h2>
              <p className="text-muted-foreground mb-4">
                Le <strong>Système d'Information Budgétaire</strong> est un outil indispensable pour moderniser la gestion financière de l'État. Grâce
                à ses fonctionnalités intégrées :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Il favorise la transparence et la traçabilité des flux financiers</li>
                <li>Il optimise l'utilisation des ressources</li>
                <li>Il garantit une exécution conforme aux priorités nationales</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                L'application S.I.B constitue donc une solution stratégique pour répondre aux défis complexes de la gouvernance financière publique.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
