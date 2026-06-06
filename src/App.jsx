import React, { useState, useEffect } from 'react';

const questionBank = [
// CARDIOLOGY (10 questions)
  { topic: "Cardiology", vignette: "58M with HTN presents with SOB, orthopnea, and bilateral crackles. BNP is elevated.", answers: ["Acute MI", "Acute decompensated heart failure", "Pulmonary embolism", "Acute pneumonia"], correct: 1, explanation: "Classic acute heart failure: SOB, orthopnea, crackles, elevated BNP." },
  { topic: "Cardiology", vignette: "62F with 3 weeks exertional chest pressure and dyspnea. EKG shows new T-wave inversions V2-V4.", answers: ["Stable angina", "Unstable angina/NSTEMI", "Aortic stenosis", "Pericarditis"], correct: 1, explanation: "T-wave inversions + exertional symptoms = NSTEMI until proven otherwise." },
  { topic: "Cardiology", vignette: "45M sudden-onset pleuritic chest pain and ST elevation aVR. BP 180/100, HR 110.", answers: ["Acute MI", "Aortic dissection", "Spontaneous pneumothorax", "Pericarditis"], correct: 1, explanation: "Sudden pleuritic pain + ST elevation + hypertension = aortic dissection." },
  { topic: "Cardiology", vignette: "38F with lupus on NSAIDs presents with friction rub and pleuritic chest pain. Diffuse ST elevation on EKG.", answers: ["Acute MI", "Pericarditis", "Myocarditis", "Pulmonary embolism"], correct: 1, explanation: "Diffuse ST elevation + friction rub = pericarditis." },
  { topic: "Cardiology", vignette: "55M with HTN, DM presents with syncope. Single S2, LVOT narrowing on echo.", answers: ["Aortic stenosis", "Hypertrophic cardiomyopathy", "Mitral stenosis", "Atrial myxoma"], correct: 1, explanation: "LVOT narrowing + syncope = HCM. Single S2 suggests AS, but LVOT obstruction points to HCM." },
  { topic: "Cardiology", vignette: "72M new-onset AFib HR 130, acute dyspnea, CXR pulmonary edema, elevated troponin.", answers: ["Rate control first", "Immediate DC cardioversion", "Anticoagulation only", "Dobutamine"], correct: 1, explanation: "AFib with RVR + heart failure + troponin elevation = rate control + consider cardioversion." },
  { topic: "Cardiology", vignette: "68F HFrEF (EF 25%) on lisinopril and metoprolol with worsening dyspnea. What's missing?", answers: ["Digoxin", "Aldosterone antagonist", "Amiodarone", "Aspirin"], correct: 1, explanation: "HFrEF guideline therapy: ACEi + beta-blocker + aldosterone antagonist." },
  { topic: "Cardiology", vignette: "51M presents with chest pain and troponin I = 2.5. EKG shows STEMI in leads II, III, aVF.", answers: ["Anterior wall MI", "Inferior wall MI", "Lateral MI", "Posterior MI"], correct: 1, explanation: "Inferior leads (II, III, aVF) = RCA or LCx territory = inferior MI." },
  { topic: "Cardiology", vignette: "64F presents with exertional dyspnea and syncope. Loud systolic murmur at right upper sternal border.", answers: ["Aortic regurgitation", "Mitral regurgitation", "Aortic stenosis", "Mitral stenosis"], correct: 2, explanation: "Systolic murmur at right upper sternal border = aortic area = aortic stenosis." },
  { topic: "Cardiology", vignette: "47M with chest pain, JVD, muffled heart sounds, and pulsus paradoxus BP 110/88 down to 100/82.", answers: ["Tension pneumothorax", "Cardiac tamponade", "Constrictive pericarditis", "Acute MI"], correct: 1, explanation: "Beck's triad (JVD, muffled hearts, hypotension) + pulsus paradoxus = cardiac tamponade." },

  // PULMONOLOGY (10 questions)
  { topic: "Pulmonology", vignette: "42M acute SOB, unilateral decreased breath sounds, hyperresonance on left after trauma.", answers: ["Hemothorax", "Tension pneumothorax", "Simple pneumothorax", "Flail chest"], correct: 2, explanation: "Hyperresonance + decreased breath sounds + trauma = pneumothorax." },
  { topic: "Pulmonology", vignette: "28F non-smoker, hemoptysis and dyspnea. CXR bilateral nodular infiltrates, elevated ACE.", answers: ["Sarcoidosis", "TB", "Lung cancer", "Goodpasture"], correct: 0, explanation: "Bilateral nodules + elevated ACE + hemoptysis = sarcoidosis." },
  { topic: "Pulmonology", vignette: "55M smoker with chronic cough, hemoptysis. CXR cavitary lesion right upper lobe.", answers: ["Sarcoidosis", "Pneumonia", "Tuberculosis", "Aspergilloma"], correct: 2, explanation: "Upper lobe cavity + cough/hemoptysis = TB until proven otherwise." },
  { topic: "Pulmonology", vignette: "62M COPD presents with pink frothy sputum and bilateral crackles.", answers: ["COPD exacerbation", "Acute pulmonary edema", "Pneumonia", "Spontaneous pneumothorax"], correct: 1, explanation: "Pink frothy sputum = pulmonary edema (cardiogenic)." },
  { topic: "Pulmonology", vignette: "38F dyspnea on exertion, orthopnea. PFTs show FEV1/FVC ratio 0.65.", answers: ["Obstructive", "Restrictive", "Mixed", "Normal"], correct: 0, explanation: "FEV1/FVC < 0.70 = obstructive pattern (COPD, asthma)." },
  { topic: "Pulmonology", vignette: "32M acute dyspnea, pleuritic chest pain. CXR wedge-shaped consolidation, HR 110, O2 sat 88%.", answers: ["Pneumonia", "Acute MI", "PE with infarction", "Pericarditis"], correct: 2, explanation: "Wedge-shaped consolidation + pleuritic pain = PE with pulmonary infarction." },
  { topic: "Pulmonology", vignette: "44F with progressive dyspnea. CXR shows diffuse interstitial infiltrates. Presented with pleurisy.", answers: ["Idiopathic pulmonary fibrosis", "Sarcoidosis", "Hypersensitivity pneumonitis", "Silicosis"], correct: 2, explanation: "Diffuse interstitial infiltrates + pleurisy history = hypersensitivity pneumonitis." },
  { topic: "Pulmonology", vignette: "19M with fever, cough, respiratory distress. CXR shows bilateral infiltrates. O2 sat 85% on RA.", answers: ["Pneumonia", "ARDS", "Asthma exacerbation", "Pulmonary edema"], correct: 1, explanation: "Bilateral infiltrates + hypoxemia refractory to O2 = ARDS until proven otherwise." },
  { topic: "Pulmonology", vignette: "56F history of smoking, presents with persistent cough and 10 lb weight loss. CXR shows 2cm nodule RUL.", answers: ["Benign nodule", "Infection", "Lung cancer", "Aspergilloma"], correct: 2, explanation: "Solitary nodule + smoking + weight loss = must evaluate for lung cancer." },
  { topic: "Pulmonology", vignette: "34M with history of night sweats, productive cough. CXR shows cavitary lesion. PPD 18mm.", answers: ["Active tuberculosis", "Latent TB", "Nontuberculous mycobacteria", "Fungal infection"], correct: 0, explanation: "Cavitary lesion + constitutional symptoms + positive PPD = active TB." },

  // NEPHROLOGY (10 questions)
  { topic: "Nephrology", vignette: "48M with DM, HTN. Cr 3.2 (baseline 0.9). Dipstick 3+ protein. UA shows muddy brown casts.", answers: ["Diabetic nephropathy", "Post-streptococcal GN", "Acute tubular necrosis", "Lupus nephritis"], correct: 2, explanation: "Muddy brown casts = ATN. Rapid Cr rise indicates acute process." },
  { topic: "Nephrology", vignette: "35F hematuria, edema, HTN, normal complement. UA shows RBC casts.", answers: ["IgA nephropathy", "Post-streptococcal GN", "Membranoproliferative GN", "Thin basement disease"], correct: 0, explanation: "RBC casts + normal complement = likely IgA nephropathy." },
  { topic: "Nephrology", vignette: "52M nephrotic syndrome (Cr 1.1, Alb 1.8). DM 15 years. Kidney biopsy: nodular GBM.", answers: ["Minimal change", "FSGS", "Diabetic nephropathy", "Membranous"], correct: 2, explanation: "Nodular GBM thickening (Kimmelstiel-Wilson) = Diabetic nephropathy." },
  { topic: "Nephrology", vignette: "41M Cr 4.2, K 6.8, HCO3 16. BP 165/105. What ECG change expected?", answers: ["Peaked T waves", "Prolonged QT", "ST depression", "AV block"], correct: 0, explanation: "Hyperkalemia causes peaked T waves as first ECG sign." },
  { topic: "Nephrology", vignette: "29F flank pain, hematuria. Renal ultrasound shows multiple bilateral cysts. Father died of renal failure.", answers: ["Pyelonephritis", "Polycystic kidney disease", "Renal infarction", "Ruptured AAA"], correct: 1, explanation: "Multiple bilateral cysts + family history = ADPKD." },
  { topic: "Nephrology", vignette: "58M on diuretics presents with Na 128, confusion. Urine osmolality 520, serum osmolality 255.", answers: ["Hypovolemic hyponatremia", "SIADH", "Hypothyroidism", "Diabetes insipidus"], correct: 1, explanation: "Low serum osmolality + high urine osmolality = SIADH." },
  { topic: "Nephrology", vignette: "67F with HTN on amlodipine. Cr 2.1, K 5.8. Renal biopsy shows hyaline arteriolosclerosis.", answers: ["Diabetic nephropathy", "Hypertensive nephrosclerosis", "IgA nephropathy", "FSGS"], correct: 1, explanation: "Hyaline arteriolosclerosis + HTN alone = hypertensive nephrosclerosis." },
  { topic: "Nephrology", vignette: "39M with fever, flank pain, CVA tenderness. UA shows WBC casts, nitrites positive.", answers: ["UTI", "Nephrolithiasis", "Pyelonephritis", "Appendicitis"], correct: 2, explanation: "WBC casts (not just WBCs) indicate upper UTI = pyelonephritis." },
  { topic: "Nephrology", vignette: "44F with nephrotic syndrome. Serum albumin 2.1, 24h protein 5.2g. Kidney biopsy shows basement membrane thickening.", answers: ["Minimal change", "FSGS", "Membranous nephropathy", "MPGN"], correct: 2, explanation: "Basement membrane thickening on electron microscopy = membranous nephropathy." },
  { topic: "Nephrology", vignette: "51M presents with acute flank pain and hematuria. CT shows 5mm stone in left ureter.", answers: ["Requires immediate intervention", "Expectant management OK", "ESWL immediately", "Nephrostomy tube"], correct: 1, explanation: "Small ureteral stones < 6mm pass spontaneously in most patients." },

  // GASTROENTEROLOGY (10 questions)
  { topic: "Gastroenterology", vignette: "48F with 5 years of postprandial epigastric burning. Worse with spicy foods and coffee. Upper scope normal.", answers: ["Peptic ulcer", "GERD", "Gastric cancer", "Pancreatitis"], correct: 1, explanation: "Postprandial burning, normal endoscopy = GERD." },
  { topic: "Gastroenterology", vignette: "62M with hematemesis and melena. Varices noted on endoscopy. Known cirrhosis.", answers: ["PUD", "Esophageal varices bleed", "Mallory-Weiss tear", "AVM"], correct: 1, explanation: "Hematemesis + varices on scope = variceal bleeding." },
  { topic: "Gastroenterology", vignette: "34M with acute RUQ pain after fatty meal. Fever 38.2°C. Murphy's sign positive.", answers: ["Biliary colic", "Acute cholecystitis", "Pancreatitis", "Hepatitis"], correct: 1, explanation: "RUQ pain + fever + Murphy's sign = acute cholecystitis." },
  { topic: "Gastroenterology", vignette: "58F with acute severe epigastric pain, elevated lipase 850. Recent alcohol binge.", answers: ["GERD", "Acute pancreatitis", "MI", "PUD"], correct: 1, explanation: "Severe epigastric pain + elevated lipase + alcohol = acute pancreatitis." },
  { topic: "Gastroenterology", vignette: "42M with chronic diarrhea, weight loss, abdominal pain. Villous atrophy on small bowel biopsy.", answers: ["IBD", "Celiac disease", "IBS", "Lactose intolerance"], correct: 1, explanation: "Villous atrophy = celiac disease until proven otherwise." },
  { topic: "Gastroenterology", vignette: "29F with diarrhea, cramping, fever for 1 week. Recent hospital discharge. Stool positive for C. difficile toxin.", answers: ["Viral gastroenteritis", "C. difficile infection", "Salmonella", "Crohn's disease"], correct: 1, explanation: "Recent antibiotics/hospitalization + positive C. diff toxin = C. difficile." },
  { topic: "Gastroenterology", vignette: "51M with ascites, jaundice, spider angiomas. PT elevated. History of hepatitis C.", answers: ["Acute hepatitis", "Cirrhosis with portal HTN", "Cholangitis", "Pancreatic cancer"], correct: 1, explanation: "Ascites + jaundice + coagulopathy + history = cirrhosis." },
  { topic: "Gastroenterology", vignette: "37M with 2 days severe crampy LLQ pain and fever. CT shows diverticulitis without perforation.", answers: ["Surgery urgently", "Antibiotics and NPO", "Colonoscopy immediately", "Observation only"], correct: 1, explanation: "Uncomplicated diverticulitis = antibiotics and bowel rest." },
  { topic: "Gastroenterology", vignette: "55F with chronic diarrhea alternating with constipation, bloating, and no weight loss. Scope normal.", answers: ["Crohn's disease", "Ulcerative colitis", "IBS", "Celiac disease"], correct: 2, explanation: "Alternating diarrhea/constipation + normal scope = IBS (Rome criteria)." },
  { topic: "Gastroenterology", vignette: "46M with 6 months of weight loss and dysphagia. Barium swallow shows apple core lesion.", answers: ["Benign stricture", "Achalasia", "Esophageal cancer", "GERD"], correct: 2, explanation: "Apple core lesion + weight loss/dysphagia = esophageal cancer." },

  // ENDOCRINOLOGY (10 questions)
  { topic: "Endocrinology", vignette: "34M with polyuria, polydipsia, weight loss. Fasting glucose 245, HbA1c 12%. Random glucose 320.", answers: ["Type 1 DM", "Type 2 DM", "LADA", "Gestational DM"], correct: 0, explanation: "Acute presentation + markedly elevated glucose = Type 1 DM." },
  { topic: "Endocrinology", vignette: "19F with DM presents with Kussmaul breathing, altered mental status. Venous pH 7.22, glucose 580.", answers: ["Hypoglycemia", "DKA", "HHS", "Lactic acidosis"], correct: 1, explanation: "Kussmaul breathing + low pH + high glucose = DKA." },
  { topic: "Endocrinology", vignette: "58M with tremor, palpitations, weight loss despite good appetite. TSH suppressed, free T4 elevated.", answers: ["Hypothyroidism", "Hyperthyroidism", "Thyroiditis", "TSH-secreting tumor"], correct: 1, explanation: "Elevated T4 + low TSH = hyperthyroidism." },
  { topic: "Endocrinology", vignette: "42F with fatigue, cold intolerance, weight gain. TSH elevated, free T4 low.", answers: ["Hyperthyroidism", "Hypothyroidism", "Thyroiditis", "Graves disease"], correct: 1, explanation: "High TSH + low free T4 = primary hypothyroidism." },
  { topic: "Endocrinology", vignette: "51M on HTN meds with hypokalemia K 3.2, metabolic alkalosis. Plasma aldosterone high despite high sodium.", answers: ["Primary hyperaldosteronism", "Diuretic abuse", "Secondary hyperaldosteronism", "Cushing syndrome"], correct: 0, explanation: "Hypokalemia + metabolic alkalosis + high aldosterone = primary hyperaldosteronism." },
  { topic: "Endocrinology", vignette: "38F with central obesity, proximal weakness, easy bruising. Morning cortisol 28. ACTH suppressed.", answers: ["Adrenal insufficiency", "Cushing syndrome", "SIADH", "Pituitary tumor"], correct: 1, explanation: "Central obesity + weakness + bruising + high cortisol = Cushing syndrome." },
  { topic: "Endocrinology", vignette: "26F with amenorrhea, hirsutism, acne. Testosterone elevated. Pelvic ultrasound shows multiple cysts.", answers: ["Cushing syndrome", "PCOS", "Androgen-secreting tumor", "Hyperprolactinemia"], correct: 1, explanation: "Amenorrhea + hirsutism + elevated testosterone + ovarian cysts = PCOS." },
  { topic: "Endocrinology", vignette: "67M with high PTH and calcium 11.2. Alkaline phosphatase elevated. X-ray shows subperiosteal resorption.", answers: ["Hypervitaminosis D", "Milk-alkali syndrome", "Primary hyperparathyroidism", "Thiazide use"], correct: 2, explanation: "High PTH + high calcium + subperiosteal resorption = primary hyperparathyroidism." },
  { topic: "Endocrinology", vignette: "52F postmenopausal with T-score -2.8 on DEXA scan. No fractures. What's the diagnosis?", answers: ["Normal bone density", "Osteopenia", "Osteoporosis", "Osteomalacia"], correct: 2, explanation: "T-score < -2.5 = osteoporosis (with or without fracture)." },
  { topic: "Endocrinology", vignette: "41M with symptomatic hypoglycemia, inappropriately elevated insulin and C-peptide during low glucose.", answers: ["Factitious hypoglycemia", "Insulinoma", "Sulfonylurea use", "Autoimmune hypoglycemia"], correct: 1, explanation: "Hypoglycemia + high insulin + high C-peptide = insulinoma or sulfonylurea use." },

  // HEMATOLOGY (10 questions)
  { topic: "Hematology", vignette: "52F with fatigue, dyspnea. Hgb 7.2, MCV 68, ferritin 8, TIBC elevated.", answers: ["Anemia of chronic disease", "Iron deficiency anemia", "Sideroblastic anemia", "Thalassemia"], correct: 1, explanation: "Low MCV + low ferritin + elevated TIBC = iron deficiency." },
  { topic: "Hematology", vignette: "67M with fatigue, paresthesias. Hgb 8.1, MCV 105, methylmalonic acid elevated.", answers: ["Folate deficiency", "B12 deficiency", "Hypothyroidism", "Reticulocytosis"], correct: 1, explanation: "Elevated methylmalonic acid = B12 deficiency." },
  { topic: "Hematology", vignette: "38F with jaundice, dark urine, elevated LDH and low haptoglobin. Direct Coombs positive.", answers: ["Hemolytic anemia", "Hereditary spherocytosis", "G6PD deficiency", "Autoimmune hemolysis"], correct: 3, explanation: "Positive direct Coombs = autoimmune hemolytic anemia." },
  { topic: "Hematology", vignette: "4YO with severe hemolytic anemia, splenomegaly, bone pain. Hgb electrophoresis shows HbS.", answers: ["Thalassemia", "G6PD deficiency", "Sickle cell disease", "Hereditary spherocytosis"], correct: 2, explanation: "HbS on electrophoresis = sickle cell disease." },
  { topic: "Hematology", vignette: "64M with bleeding gums, petechiae, platelets 18K. Bone marrow shows hypocellularity.", answers: ["ITP", "TTP", "DIC", "Aplastic anemia"], correct: 3, explanation: "Hypocellular marrow + thrombocytopenia = aplastic anemia." },
  { topic: "Hematology", vignette: "23F with thrombocytopenia (PLT 25K), microangiopathic hemolytic anemia, fever, AKI, neurologic symptoms.", answers: ["ITP", "DIC", "TTP", "HUS"], correct: 2, explanation: "Pentad of fever, thrombocytopenia, MAHA, neurologic, renal = TTP." },
  { topic: "Hematology", vignette: "58M with WBC 95K, anemia, thrombocytopenia. Blast count 22%. Auer rods seen.", answers: ["Chronic leukemia", "Acute leukemia", "Leukemoid reaction", "Lymphoma"], correct: 1, explanation: "High blast percentage + Auer rods = acute leukemia." },
  { topic: "Hematology", vignette: "72M with bone pain, renal dysfunction, hypercalcemia. Serum protein elevated, spike on SPEP.", answers: ["Waldenstrom", "Multiple myeloma", "Light chain disease", "Lymphoma"], correct: 1, explanation: "Monoclonal spike + hypercalcemia + bone pain = multiple myeloma." },
  { topic: "Hematology", vignette: "46F on warfarin with INR 8.5, no bleeding. Should you give FFP?", answers: ["Yes immediately", "Fresh frozen plasma if bleeding", "Vitamin K only", "Observation"], correct: 2, explanation: "Asymptomatic elevated INR = vitamin K alone; FFP if actively bleeding." },
  { topic: "Hematology", vignette: "31M with fever, night sweats, weight loss, supraclavicular lymphadenopathy. Biopsy shows Reed-Sternberg cells.", answers: ["NHL", "Hodgkin lymphoma", "Tuberculosis", "Lymphoid hyperplasia"], correct: 1, explanation: "Reed-Sternberg cells = Hodgkin lymphoma." },

  // INFECTIOUS DISEASE (10 questions)
  { topic: "Infectious Disease", vignette: "47M with fever, hypotension, tachycardia, altered mental status. Lactate 4.2. Blood cultures pending.", answers: ["Septic shock", "Cardiogenic shock", "Anaphylaxis", "Stroke"], correct: 0, explanation: "Fever + organ dysfunction + hypotension = septic shock." },
  { topic: "Infectious Disease", vignette: "34M with fever, headache, nuchal rigidity. Petechial rash. CSF shows low glucose, high protein, WBC predominance.", answers: ["Viral meningitis", "Bacterial meningitis", "TB meningitis", "Fungal meningitis"], correct: 1, explanation: "Bacterial meningitis: low CSF glucose, high protein, neutrophil predominance." },
  { topic: "Infectious Disease", vignette: "28M with fever, headache, altered mental status. CSF normal. Brain MRI shows temporal lobe enhancement.", answers: ["Bacterial meningitis", "Viral meningitis", "Herpes encephalitis", "Fungal meningitis"], correct: 2, explanation: "Temporal lobe involvement + encephalitis = HSV encephalitis." },
  { topic: "Infectious Disease", vignette: "52M with valve replacement 2 months ago presents with fever, new murmur, septic emboli.", answers: ["Acute endocarditis", "Subacute endocarditis", "Pericarditis", "Myocarditis"], correct: 0, explanation: "New murmur + fever + prosthetic valve = endocarditis." },
  { topic: "Infectious Disease", vignette: "39F with fever, RLQ pain, diarrhea. Stool culture positive for Salmonella. No blood cultures.", answers: ["Treat with antibiotics", "Observe without antibiotics", "Supportive care", "Surgery"], correct: 1, explanation: "Salmonella gastroenteritis in non-invasive form: supportive care, avoid antibiotics (prolong carrier state)." },
  { topic: "Infectious Disease", vignette: "45M with fever, rash (maculopapular), and exposure history to measles patient. Koplik spots noted.", answers: ["Rubella", "Measles", "Varicella", "Scarlet fever"], correct: 1, explanation: "Koplik spots + maculopapular rash = measles." },
  { topic: "Infectious Disease", vignette: "31M with ulcer on genitals, inguinal lymphadenopathy, history of unprotected sex in endemic area.", answers: ["Herpes simplex", "Syphilis", "Haemophilus ducreyi (chancroid)", "Klebsiella granulomatis"], correct: 2, explanation: "Painful genital ulcer + lymphadenopathy = chancroid." },
  { topic: "Infectious Disease", vignette: "27F with fever, productive cough, ground-glass infiltrates. CD4 count 45. PCP stain positive.", answers: ["Bacterial pneumonia", "TB", "PCP", "CMV"], correct: 2, explanation: "CD4 < 200 + ground-glass infiltrates = PCP." },
  { topic: "Infectious Disease", vignette: "52M with fever, tender hepatomegaly, elevated transaminases. Serology: HBsAg positive, anti-HBc positive, HBeAg positive.", answers: ["Chronic hepatitis B", "Acute hepatitis B", "Hepatitis B immunity", "False positive"], correct: 1, explanation: "HBsAg + HBeAg + anti-HBc = acute or chronic HBV; clinical context matters." },
  { topic: "Infectious Disease", vignette: "48M returns from malaria-endemic region with fever, chills, jaundice. Thick and thin blood smears ordered.", answers: ["Dengue", "Typhoid", "Malaria", "Leptospirosis"], correct: 2, explanation: "Fever from endemic region + cyclical chills = malaria." },

  // NEUROLOGY (10 questions)
  { topic: "Neurology", vignette: "67M with sudden-onset right-sided weakness and facial droop. Speech slurred. Last known well 2 hours ago.", answers: ["TIA", "Hemorrhagic stroke", "Ischemic stroke", "Todd's paralysis"], correct: 2, explanation: "Sudden focal deficit within window = ischemic stroke; tPA candidate." },
  { topic: "Neurology", vignette: "54F with thunderclap headache, neck stiffness, photophobia. CT head normal. Concern for SAH.", answers: ["Tension headache", "Migraine", "Subarachnoid hemorrhage", "Meningitis"], correct: 2, explanation: "Thunderclap + normal CT = LP needed to rule out SAH." },
  { topic: "Neurology", vignette: "8YO with fever, altered mental status, generalized seizures lasting 5 minutes. EEG ongoing spike activity.", answers: ["Simple febrile seizure", "Status epilepticus", "Meningitis", "Encephalitis"], correct: 1, explanation: "Prolonged seizure activity (>5 min) = status epilepticus; needs emergent treatment." },
  { topic: "Neurology", vignette: "42F with acute unilateral facial weakness, eye closure difficulty. Taste preserved on anterior 2/3 tongue.", answers: ["Stroke", "Bell's palsy", "Tumor", "Ramsay Hunt"], correct: 1, explanation: "Unilateral facial weakness = Bell's palsy (diagnosis of exclusion)." },
  { topic: "Neurology", vignette: "38M with progressive weakness in legs, ascending pattern, areflexia, respiratory effort increasing.", answers: ["Transverse myelitis", "GBS", "SMA", "Spinal cord compression"], correct: 1, explanation: "Ascending weakness + areflexia + respiratory involvement = GBS." },
  { topic: "Neurology", vignette: "55F with progressive memory loss, behavioral changes over 3 years. MRI shows atrophy in temporal lobes.", answers: ["Vascular dementia", "Lewy body", "Frontotemporal dementia", "Alzheimer dementia"], correct: 3, explanation: "Memory loss predominant + temporal atrophy = Alzheimer dementia." },
  { topic: "Neurology", vignette: "31M with diplopia, ptosis, generalized weakness worse with fatigue. Anti-acetylcholine receptor antibodies positive.", answers: ["Myasthenia gravis", "Eaton-Lambert", "Polymyositis", "Thyroid eye disease"], correct: 0, explanation: "Ptosis + diplopia + antibodies to AChR = myasthenia gravis." },
  { topic: "Neurology", vignette: "58M with tremor at rest, bradykinesia, rigidity. Asymmetric presentation.", answers: ["Essential tremor", "Parkinson disease", "Ataxia", "Dystonia"], correct: 1, explanation: "Resting tremor + bradykinesia + rigidity = Parkinson disease." },
  { topic: "Neurology", vignette: "24F with optic neuritis, transverse myelitis history. MRI brain shows multiple white matter lesions.", answers: ["TIA", "Migraine", "Multiple sclerosis", "Stroke"], correct: 2, explanation: "Optic neuritis + myelitis + brain lesions = multiple sclerosis." },
  { topic: "Neurology", vignette: "68M with vertigo, unilateral hearing loss, tinnitus. Weber test: sound lateralizes to affected ear.", answers: ["BPPV", "Vestibular neuritis", "Ménière disease", "Central vertigo"], correct: 2, explanation: "Vertigo + hearing loss + tinnitus = Ménière disease." },

  // PSYCHIATRY (10 questions)
  { topic: "Psychiatry", vignette: "32F with 2 weeks of depressed mood, anhedonia, insomnia, guilt, concentration problems. Suicidal ideation.", answers: ["Adjustment disorder", "Major depressive disorder", "Dysthymia", "Bipolar disorder"], correct: 1, explanation: "5+ symptoms ≥ 2 weeks = major depressive disorder." },
  { topic: "Psychiatry", vignette: "28M with 1 week of decreased need for sleep, grandiosity, racing thoughts, increased goal-directed activity.", answers: ["ADHD", "Mania", "Anxiety disorder", "Hypomania"], correct: 1, explanation: "Distinct period with 3+ manic symptoms ≥ 1 week = mania." },
  { topic: "Psychiatry", vignette: "45M with 6 months of persistent worry about health, finances, relationships. Anxious most days.", answers: ["Social anxiety", "Generalized anxiety disorder", "Panic disorder", "Specific phobia"], correct: 1, explanation: "Excessive worry about multiple domains ≥ 6 months = GAD." },
  { topic: "Psychiatry", vignette: "35F with recurrent panic attacks (sudden onset, palpitations, sweating, fear of dying) with agoraphobia.", answers: ["Generalized anxiety", "Specific phobia", "Panic disorder", "Social anxiety"], correct: 2, explanation: "Recurrent panic attacks + agoraphobia = panic disorder." },
  { topic: "Psychiatry", vignette: "52M with intrusive war memories, nightmares, hypervigilance, avoidance of triggers. Combat veteran.", answers: ["Adjustment disorder", "PTSD", "Acute stress disorder", "Generalized anxiety"], correct: 1, explanation: "Intrusive memories + avoidance + hyperarousal ≥ 1 month = PTSD." },
  { topic: "Psychiatry", vignette: "28F with obsessions about contamination and compulsions to wash hands excessively. Recognizes irrationality.", answers: ["Generalized anxiety", "Specific phobia", "OCD", "Body dysmorphia"], correct: 2, explanation: "Obsessions + compulsions that are distressing = OCD." },
  { topic: "Psychiatry", vignette: "24M with disorganized speech, persecutory delusions, auditory hallucinations. Functional decline.", answers: ["Brief psychotic disorder", "Schizophreniform", "Schizophrenia", "Delusional disorder"], correct: 2, explanation: "Psychotic symptoms ≥ 6 months with functional decline = schizophrenia." },
  { topic: "Psychiatry", vignette: "41F with binge eating episodes (loss of control, guilt after), restricting, excessive exercise. BMI 28.", answers: ["Anorexia nervosa", "Bulimia nervosa", "Binge eating disorder", "Avoidant food intake"], correct: 2, explanation: "Binge eating + compensatory behavior + normal BMI = bulimia; markedly low BMI = anorexia." },
  { topic: "Psychiatry", vignette: "19M with acute alcohol intoxication, 1 day after last drink: tremor, agitation, autonomic hyperactivity, hallucinations.", answers: ["Wernicke encephalopathy", "Alcohol withdrawal", "Delirium tremens", "Hepatic encephalopathy"], correct: 2, explanation: "Tremor + autonomic hyperactivity + hallucinations = alcohol withdrawal (potentially delirium tremens)." },
  { topic: "Psychiatry", vignette: "38M reports persistent pattern of need to be center of attention, manipulative, lacks empathy, exploitative.", answers: ["Borderline personality", "Narcissistic personality", "Antisocial personality", "Histrionic personality"], correct: 1, explanation: "Grandiosity + need for admiration + lack of empathy = narcissistic PD." },

  // RHEUMATOLOGY (10 questions)
  { topic: "Rheumatology", vignette: "52F with symmetric hand joint pain (PIP, MCP), morning stiffness 2 hours, elevated ESR and RF positive.", answers: ["Osteoarthritis", "Rheumatoid arthritis", "Systemic lupus erythematosus", "Gout"], correct: 1, explanation: "Symmetric small joint involvement + RF positive = rheumatoid arthritis." },
  { topic: "Rheumatology", vignette: "35F with malar rash, photosensitivity, oral ulcers, arthritis. ANA positive with anti-dsDNA antibodies.", answers: ["Sjögren syndrome", "Systemic sclerosis", "Systemic lupus erythematosus", "Mixed connective tissue disease"], correct: 2, explanation: "Anti-dsDNA + clinical features = SLE." },
  { topic: "Rheumatology", vignette: "48M with acute monoarticular knee pain, joint aspiration shows needle-shaped crystals, negatively birefringent.", answers: ["RA", "Pseudogout", "Gout", "Septic arthritis"], correct: 2, explanation: "Negatively birefringent crystals = urate = gout." },
  { topic: "Rheumatology", vignette: "64F with sudden onset knee pain, joint aspiration shows rhomboid-shaped crystals, positively birefringent.", answers: ["Gout", "Pseudogout", "RA", "Septic arthritis"], correct: 1, explanation: "Positively birefringent = calcium pyrophosphate = pseudogout." },
  { topic: "Rheumatology", vignette: "67M with polymyalgia (shoulder/hip), elevated ESR 78, normal CBC. Age > 50.", answers: ["Rheumatoid arthritis", "Polymyalgia rheumatica", "Myositis", "Thyroid disease"], correct: 1, explanation: "Bilateral shoulder/hip pain + elevated ESR + age > 50 = PMR." },
  { topic: "Rheumatology", vignette: "72F with temporal headache, jaw claudication, visual loss. Elevated ESR. Temporal artery biopsy shows granulomas.", answers: ["Polymyalgia rheumatica", "Giant cell arteritis", "Takayasu arteritis", "Polyarteritis nodosa"], correct: 1, explanation: "Temporal headache + visual loss + granulomatous inflammation = GCA." },
  { topic: "Rheumatology", vignette: "58M with tight skin of face and hands, esophageal dysmotility, Raynaud phenomenon. Anti-Scl70 antibody positive.", answers: ["SLE", "Sjögren syndrome", "Systemic sclerosis", "Mixed connective tissue"], correct: 2, explanation: "Skin tightness + esophageal dysmotility + anti-Scl70 = systemic sclerosis (scleroderma)." },
  { topic: "Rheumatology", vignette: "41M with inflammatory back pain, morning stiffness 1.5 hours, sacroiliitis on imaging. HLA-B27 positive.", answers: ["Osteoarthritis", "Rheumatoid arthritis", "Ankylosing spondylitis", "Gout"], correct: 2, explanation: "Inflammatory back pain + sacroiliitis + HLA-B27 = ankylosing spondylitis." },
  { topic: "Rheumatology", vignette: "44F with arthritis, dry eyes, dry mouth, anti-Ro/SSA and anti-La/SSB antibodies positive.", answers: ["SLE", "Rheumatoid arthritis", "Sjögren syndrome", "Scleroderma"], correct: 2, explanation: "Anti-Ro/SSA and anti-La/SSB = Sjögren syndrome." },
  { topic: "Rheumatology", vignette: "52M with skin ulcers, abdominal pain, hematuria, palpable purpura on lower extremities. P-ANCA positive.", answers: ["Polyarteritis nodosa", "Microscopic polyangiitis", "GPA", "Takayasu"], correct: 1, explanation: "P-ANCA with necrotizing vasculitis + palpable purpura = microscopic polyangiitis." },];

export default function ReflexTrainer() {
  const [gameStarted, setGameStarted] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);

  const generateNewSession = () => {
    const topics = [...new Set(questionBank.map((q) => q.topic))];
    const selectedTopics = topics.sort(() => Math.random() - 0.5).slice(0, 10);

    const newQuestions = selectedTopics.map((topic) => {
      const topicQuestions = questionBank.filter((q) => q.topic === topic);
      return topicQuestions[Math.floor(Math.random() * topicQuestions.length)];
    });

    setSessionQuestions(newQuestions);
    setCurrentQIndex(0);
    setScore(0);
    setStreak(0);
    setAnswered(false);
    setSelectedAnswer(null);
    setShuffledAnswers([]);
    setTimeLeft(15);
    setTimerActive(true);
    setSessionComplete(false);
  };

  const startGame = () => {
    setGameStarted(true);
    generateNewSession();
  };

  const current = sessionQuestions[currentQIndex];

  useEffect(() => {
    if (!gameStarted || !current || sessionComplete) return;

    const shuffled = [...current.answers].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
    setAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(15);
    setTimerActive(true);
  }, [currentQIndex, current, gameStarted, sessionComplete]);

  useEffect(() => {
    if (!gameStarted || !timerActive || answered || sessionComplete) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          setAnswered(true);
          setStreak(0);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, timerActive, answered, sessionComplete]);

  const handleAnswer = (index) => {
    if (!current) return;

    const isCorrect =
      shuffledAnswers[index] === current.answers[current.correct];

    setSelectedAnswer(index);
    setAnswered(true);
    setTimerActive(false);

    if (isCorrect) {
      const nextStreak = streak + 1;
      setScore((prev) => prev + 1);
      setStreak(nextStreak);

      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
      }
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQIndex < sessionQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setSessionComplete(true);
      setTimerActive(false);
    }
  };

  const accuracy =
    Math.round((score / (currentQIndex + (answered ? 1 : 0))) * 100) || 0;

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              STEP 2 CK Reflex Trainer
            </h1>

            <p className="text-indigo-200 text-lg md:text-xl mb-8 leading-relaxed">
              Build faster clinical pattern recognition with short, timed Step 2 CK-style reflex questions.
            </p>

            <button
              onClick={startGame}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition shadow-lg"
            >
              Start Training your Reflexes
            </button>

            <p className="text-indigo-300 text-sm mt-6">
              Random 10-question sessions • 15 seconds per question
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    const finalAccuracy =
      Math.round((score / sessionQuestions.length) * 100) || 0;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Session Complete
            </h1>

            <p className="text-indigo-200 text-lg mb-8">
              Nice work. Here is how you did this round.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-green-400">
                  {score}/10
                </div>
                <div className="text-sm text-indigo-200 mt-1">Correct</div>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-blue-400">
                  {finalAccuracy}%
                </div>
                <div className="text-sm text-indigo-200 mt-1">Accuracy</div>
              </div>

              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl font-bold text-orange-400">
                  {bestStreak}
                </div>
                <div className="text-sm text-indigo-200 mt-1">
                  Best streak
                </div>
              </div>
            </div>

            <p className="text-indigo-100 text-base mb-8 leading-relaxed">
              The goal is not just to get questions right, but to build faster recognition of clinical patterns under time pressure.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={generateNewSession}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition"
              >
                Start New Session
              </button>

              <button
                onClick={() => {
                  setGameStarted(false);
                  setSessionComplete(false);
                  setTimerActive(false);
                  setSessionQuestions([]);
                  setCurrentQIndex(0);
                  setScore(0);
                  setStreak(0);
                  setAnswered(false);
                  setSelectedAnswer(null);
                  setShuffledAnswers([]);
                  setTimeLeft(15);
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-full transition border border-white/20"
              >
                Back to Start
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🏥 STEP 2 CK Reflex Trainer
          </h1>
          <p className="text-indigo-200">
            Random 10-Question Session • {sessionQuestions.length} questions loaded
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">{score}</div>
            <div className="text-xs text-indigo-200">Correct</div>
          </div>

          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">{streak}</div>
            <div className="text-xs text-indigo-200">Streak</div>
          </div>

          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {bestStreak}
            </div>
            <div className="text-xs text-indigo-200">Best</div>
          </div>

          <div className="bg-white/10 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">{accuracy}%</div>
            <div className="text-xs text-indigo-200">Accuracy</div>
          </div>
        </div>

        <div className="bg-white/95 rounded-xl p-8 mb-6 shadow-2xl">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                {current.topic}
              </span>

              <span className="ml-2 text-slate-500 text-sm">
                Q{currentQIndex + 1}/10
              </span>
            </div>

            <div
              className={`text-3xl font-bold ${
                timeLeft > 5
                  ? "text-green-600"
                  : timeLeft > 2
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {timeLeft}s
            </div>
          </div>

          <div className="w-full h-2 bg-slate-300 rounded-full mb-6 overflow-hidden">
            <div
              className={`h-full transition-all ${
                timeLeft > 5
                  ? "bg-green-500"
                  : timeLeft > 2
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${(timeLeft / 15) * 100}%` }}
            />
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-8 leading-relaxed">
            {current.vignette}
          </h2>

          <div className="space-y-3">
            {shuffledAnswers.map((answer, idx) => {
              const isCorrect = answer === current.answers[current.correct];
              const isSelected = idx === selectedAnswer;

              let buttonStyle =
                "bg-white border-2 border-indigo-200 hover:border-indigo-400 text-slate-700";

              if (answered) {
                if (isCorrect) {
                  buttonStyle =
                    "bg-green-100 border-2 border-green-500 text-green-900";
                } else if (isSelected && !isCorrect) {
                  buttonStyle =
                    "bg-red-100 border-2 border-red-500 text-red-900";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => !answered && handleAnswer(idx)}
                  disabled={answered || !timerActive}
                  className={`w-full p-4 rounded-lg font-medium text-left transition-all ${buttonStyle} disabled:cursor-default`}
                >
                  {answer}
                </button>
              );
            })}
          </div>

          {answered && (
            <div
              className={`mt-6 p-4 rounded ${
                timeLeft === 0
                  ? "bg-red-50 border-l-4 border-red-500"
                  : "bg-amber-50 border-l-4 border-amber-500"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  timeLeft === 0 ? "text-red-900" : "text-amber-900"
                }`}
              >
                {timeLeft === 0 ? "⏱️ Time's up! " : "💡 "}
                {current.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-center">
          {answered && (
            <button
              onClick={nextQuestion}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition"
            >
              {currentQIndex < sessionQuestions.length - 1
                ? "Next Question →"
                : "View Results →"}
            </button>
          )}

          <button
            onClick={generateNewSession}
            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center gap-2"
          >
            🔄 New Session
          </button>
        </div>
      </div>
    </div>
  );
}
