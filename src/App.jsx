import React, { useState, useEffect } from 'react';

const questionBank = [
  // CARDIOLOGY
  {
    topic: "Cardiology",
    vignette: "58M with HTN has dyspnea, orthopnea, bibasilar crackles, leg edema, and elevated BNP.",
    answers: ["Acute MI", "Acute decompensated heart failure", "Pulmonary embolism", "Pneumonia"],
    correct: 1,
    explanation: "Orthopnea + crackles + edema + elevated BNP = acute decompensated heart failure."
  },
  {
    topic: "Cardiology",
    vignette: "62F has chest pressure at rest. Troponin is elevated and ECG shows new T-wave inversions.",
    answers: ["Stable angina", "NSTEMI", "Aortic stenosis", "Pericarditis"],
    correct: 1,
    explanation: "Chest pain at rest + elevated troponin = NSTEMI."
  },
  {
    topic: "Cardiology",
    vignette: "45M has sudden tearing chest pain radiating to the back with unequal arm blood pressures.",
    answers: ["Acute MI", "Aortic dissection", "Pulmonary embolism", "Pericarditis"],
    correct: 1,
    explanation: "Tearing pain to the back + pulse/BP differential = aortic dissection."
  },
  {
    topic: "Cardiology",
    vignette: "38F has sharp pleuritic chest pain improved by leaning forward. ECG shows diffuse ST elevation.",
    answers: ["Acute MI", "Pericarditis", "Aortic dissection", "Pulmonary embolism"],
    correct: 1,
    explanation: "Pleuritic positional chest pain + diffuse ST elevation = acute pericarditis."
  },
  {
    topic: "Cardiology",
    vignette: "24M has exertional syncope. Systolic murmur increases with Valsalva and echo shows asymmetric septal hypertrophy.",
    answers: ["Aortic stenosis", "Hypertrophic cardiomyopathy", "Mitral stenosis", "Atrial myxoma"],
    correct: 1,
    explanation: "Young patient + exertional syncope + murmur louder with Valsalva = HCM."
  },
  {
    topic: "Cardiology",
    vignette: "72M with atrial fibrillation has HR 160, hypotension, altered mental status, and pulmonary edema.",
    answers: ["IV beta-blocker", "Immediate synchronized cardioversion", "Oral anticoagulation only", "Observation"],
    correct: 1,
    explanation: "Unstable tachyarrhythmia = immediate synchronized cardioversion."
  },
  {
    topic: "Cardiology",
    vignette: "68F with HFrEF is on lisinopril and metoprolol. EF is 25% and potassium is normal.",
    answers: ["Digoxin", "Aldosterone antagonist", "Amiodarone", "Aspirin"],
    correct: 1,
    explanation: "HFrEF therapy includes ACEi/ARB/ARNI + beta-blocker + mineralocorticoid antagonist when appropriate."
  },
  {
    topic: "Cardiology",
    vignette: "51M has chest pain. ECG shows ST elevation in leads II, III, and aVF.",
    answers: ["Anterior wall MI", "Inferior wall MI", "Lateral wall MI", "Posterior wall MI"],
    correct: 1,
    explanation: "ST elevation in II, III, aVF = inferior wall MI."
  },
  {
    topic: "Cardiology",
    vignette: "74M has exertional syncope and a harsh systolic murmur at the right upper sternal border radiating to the carotids.",
    answers: ["Aortic regurgitation", "Mitral regurgitation", "Aortic stenosis", "Mitral stenosis"],
    correct: 2,
    explanation: "Harsh systolic RUSB murmur radiating to carotids = aortic stenosis."
  },
  {
    topic: "Cardiology",
    vignette: "47M has hypotension, JVD, muffled heart sounds, and pulsus paradoxus after chest trauma.",
    answers: ["Tension pneumothorax", "Cardiac tamponade", "Constrictive pericarditis", "Acute MI"],
    correct: 1,
    explanation: "Beck triad + pulsus paradoxus = cardiac tamponade."
  },

  // PULMONOLOGY
  {
    topic: "Pulmonology",
    vignette: "42M has acute dyspnea after trauma with unilateral decreased breath sounds and hyperresonance.",
    answers: ["Hemothorax", "Tension pneumothorax", "Simple pneumothorax", "Flail chest"],
    correct: 2,
    explanation: "Unilateral decreased breath sounds + hyperresonance = pneumothorax."
  },
  {
    topic: "Pulmonology",
    vignette: "28F has dyspnea, dry cough, bilateral hilar lymphadenopathy, erythema nodosum, and elevated ACE.",
    answers: ["Sarcoidosis", "Tuberculosis", "Lung cancer", "Goodpasture syndrome"],
    correct: 0,
    explanation: "Bilateral hilar lymphadenopathy + erythema nodosum + elevated ACE = sarcoidosis."
  },
  {
    topic: "Pulmonology",
    vignette: "55M has chronic cough, night sweats, weight loss, hemoptysis, and an upper-lobe cavitary lesion.",
    answers: ["Sarcoidosis", "Pneumonia", "Tuberculosis", "Aspergilloma"],
    correct: 2,
    explanation: "Constitutional symptoms + upper-lobe cavity = active tuberculosis."
  },
  {
    topic: "Pulmonology",
    vignette: "62M has acute dyspnea, pink frothy sputum, bibasilar crackles, and cardiomegaly on CXR.",
    answers: ["COPD exacerbation", "Cardiogenic pulmonary edema", "Pneumonia", "Pneumothorax"],
    correct: 1,
    explanation: "Pink frothy sputum + crackles + cardiomegaly = cardiogenic pulmonary edema."
  },
  {
    topic: "Pulmonology",
    vignette: "38F has wheezing and dyspnea. PFTs show FEV1/FVC ratio of 0.65.",
    answers: ["Obstructive lung disease", "Restrictive lung disease", "Normal spirometry", "Pulmonary vascular disease"],
    correct: 0,
    explanation: "FEV1/FVC < 0.70 = obstructive physiology."
  },
  {
    topic: "Pulmonology",
    vignette: "32M has acute pleuritic chest pain, tachycardia, hypoxemia, and wedge-shaped opacity on CXR.",
    answers: ["Pneumonia", "Acute MI", "Pulmonary embolism with infarction", "Pericarditis"],
    correct: 2,
    explanation: "Pleuritic pain + hypoxemia + wedge-shaped opacity = PE with infarction."
  },
  {
    topic: "Pulmonology",
    vignette: "44F bird breeder has cough, dyspnea, diffuse interstitial infiltrates, and symptoms worse after exposure.",
    answers: ["Idiopathic pulmonary fibrosis", "Sarcoidosis", "Hypersensitivity pneumonitis", "Silicosis"],
    correct: 2,
    explanation: "Bird/mold exposure + interstitial lung disease = hypersensitivity pneumonitis."
  },
  {
    topic: "Pulmonology",
    vignette: "19M with sepsis develops severe hypoxemia and bilateral infiltrates without signs of heart failure.",
    answers: ["Pneumonia", "ARDS", "Asthma exacerbation", "Cardiogenic pulmonary edema"],
    correct: 1,
    explanation: "Severe hypoxemia + bilateral infiltrates + no heart failure = ARDS."
  },
  {
    topic: "Pulmonology",
    vignette: "56F smoker has cough, weight loss, and a 2-cm spiculated right upper-lobe pulmonary nodule.",
    answers: ["Benign granuloma", "Viral infection", "Lung cancer", "Pulmonary abscess"],
    correct: 2,
    explanation: "Smoking + weight loss + spiculated lung nodule = lung cancer until proven otherwise."
  },
  {
    topic: "Pulmonology",
    vignette: "34M has productive cough, night sweats, weight loss, cavitary lesion, and positive acid-fast smear.",
    answers: ["Active tuberculosis", "Latent TB", "Nontuberculous mycobacteria", "Histoplasmosis"],
    correct: 0,
    explanation: "Symptoms + cavitary lesion + acid-fast bacilli = active TB."
  },

  // NEPHROLOGY
  {
    topic: "Nephrology",
    vignette: "48M with sepsis has acute creatinine rise and muddy brown granular casts on urinalysis.",
    answers: ["Diabetic nephropathy", "Poststreptococcal GN", "Acute tubular necrosis", "Lupus nephritis"],
    correct: 2,
    explanation: "Muddy brown casts = acute tubular necrosis."
  },
  {
    topic: "Nephrology",
    vignette: "35F has hematuria, hypertension, edema, RBC casts, and normal complement levels.",
    answers: ["IgA nephropathy", "Poststreptococcal GN", "Membranoproliferative GN", "Minimal change disease"],
    correct: 0,
    explanation: "Nephritic syndrome + normal complement = IgA nephropathy pattern."
  },
  {
    topic: "Nephrology",
    vignette: "52M with long-standing diabetes has nephrotic-range proteinuria and nodular glomerulosclerosis on biopsy.",
    answers: ["Minimal change disease", "FSGS", "Diabetic nephropathy", "Membranous nephropathy"],
    correct: 2,
    explanation: "Nodular glomerulosclerosis = diabetic nephropathy."
  },
  {
    topic: "Nephrology",
    vignette: "41M with renal failure has potassium 6.8 and new peaked T waves on ECG.",
    answers: ["Hyperkalemia", "Hypocalcemia", "Hypomagnesemia", "Hypokalemia"],
    correct: 0,
    explanation: "Hyperkalemia causes peaked T waves."
  },
  {
    topic: "Nephrology",
    vignette: "29F has flank pain, hematuria, bilateral renal cysts, and a father who died of renal failure.",
    answers: ["Pyelonephritis", "Autosomal dominant polycystic kidney disease", "Renal infarction", "Renal cell carcinoma"],
    correct: 1,
    explanation: "Bilateral renal cysts + family history = ADPKD."
  },
  {
    topic: "Nephrology",
    vignette: "58M has confusion, serum osmolality 255, urine osmolality 520, urine sodium high, and euvolemia.",
    answers: ["Hypovolemic hyponatremia", "SIADH", "Diabetes insipidus", "Primary polydipsia"],
    correct: 1,
    explanation: "Euvolemic hyponatremia + concentrated urine = SIADH."
  },
  {
    topic: "Nephrology",
    vignette: "67F with long-standing hypertension has chronic kidney disease and hyaline arteriolosclerosis on biopsy.",
    answers: ["Diabetic nephropathy", "Hypertensive nephrosclerosis", "IgA nephropathy", "FSGS"],
    correct: 1,
    explanation: "Hypertension + hyaline arteriolosclerosis = hypertensive nephrosclerosis."
  },
  {
    topic: "Nephrology",
    vignette: "39M has fever, flank pain, CVA tenderness, nitrite-positive urine, and WBC casts.",
    answers: ["Cystitis", "Nephrolithiasis", "Pyelonephritis", "Appendicitis"],
    correct: 2,
    explanation: "Fever + CVA tenderness + WBC casts = pyelonephritis."
  },
  {
    topic: "Nephrology",
    vignette: "44F has nephrotic syndrome and biopsy shows diffuse glomerular basement membrane thickening.",
    answers: ["Minimal change disease", "FSGS", "Membranous nephropathy", "MPGN"],
    correct: 2,
    explanation: "Nephrotic syndrome + GBM thickening = membranous nephropathy."
  },
  {
    topic: "Nephrology",
    vignette: "51M has acute flank pain and hematuria. CT shows a 5-mm ureteral stone without infection.",
    answers: ["Immediate surgery", "Analgesia and observation", "Emergency nephrostomy", "Immediate dialysis"],
    correct: 1,
    explanation: "Small uncomplicated ureteral stones often pass with analgesia and observation."
  },

  // GASTROENTEROLOGY
  {
    topic: "Gastroenterology",
    vignette: "48F has postprandial burning epigastric/chest discomfort, sour taste, and normal upper endoscopy.",
    answers: ["Peptic ulcer disease", "GERD", "Gastric cancer", "Acute pancreatitis"],
    correct: 1,
    explanation: "Burning discomfort + sour taste/regurgitation = GERD."
  },
  {
    topic: "Gastroenterology",
    vignette: "62M with cirrhosis has massive hematemesis and endoscopy shows bleeding esophageal varices.",
    answers: ["Peptic ulcer bleeding", "Esophageal variceal bleeding", "Mallory-Weiss tear", "Angiodysplasia"],
    correct: 1,
    explanation: "Cirrhosis + bleeding varices = esophageal variceal bleeding."
  },
  {
    topic: "Gastroenterology",
    vignette: "34F has RUQ pain after fatty meals, fever, leukocytosis, and positive Murphy sign.",
    answers: ["Biliary colic", "Acute cholecystitis", "Acute pancreatitis", "Viral hepatitis"],
    correct: 1,
    explanation: "RUQ pain + fever + Murphy sign = acute cholecystitis."
  },
  {
    topic: "Gastroenterology",
    vignette: "58F has severe epigastric pain radiating to the back after alcohol binge and lipase 850.",
    answers: ["GERD", "Acute pancreatitis", "Acute MI", "Peptic ulcer disease"],
    correct: 1,
    explanation: "Epigastric pain to back + elevated lipase = acute pancreatitis."
  },
  {
    topic: "Gastroenterology",
    vignette: "42M has chronic diarrhea, weight loss, iron deficiency, and villous atrophy on small bowel biopsy.",
    answers: ["Crohn disease", "Celiac disease", "IBS", "Lactose intolerance"],
    correct: 1,
    explanation: "Villous atrophy + malabsorption = celiac disease."
  },
  {
    topic: "Gastroenterology",
    vignette: "29F develops watery diarrhea after clindamycin. Stool toxin assay is positive.",
    answers: ["Viral gastroenteritis", "C. difficile infection", "Salmonella", "Crohn disease"],
    correct: 1,
    explanation: "Antibiotic exposure + positive toxin assay = C. difficile infection."
  },
  {
    topic: "Gastroenterology",
    vignette: "51M with hepatitis C has ascites, jaundice, spider angiomas, thrombocytopenia, and elevated INR.",
    answers: ["Acute hepatitis", "Cirrhosis with portal hypertension", "Acute cholangitis", "Pancreatic cancer"],
    correct: 1,
    explanation: "Ascites + spider angiomas + coagulopathy = decompensated cirrhosis."
  },
  {
    topic: "Gastroenterology",
    vignette: "37M has LLQ pain, fever, leukocytosis, and CT-confirmed uncomplicated diverticulitis.",
    answers: ["Urgent surgery", "Bowel rest and antibiotics", "Immediate colonoscopy", "No treatment needed"],
    correct: 1,
    explanation: "Uncomplicated diverticulitis = bowel rest and antibiotics/supportive care."
  },
  {
    topic: "Gastroenterology",
    vignette: "55F has chronic abdominal pain with alternating diarrhea and constipation. No weight loss; colonoscopy is normal.",
    answers: ["Crohn disease", "Ulcerative colitis", "Irritable bowel syndrome", "Celiac disease"],
    correct: 2,
    explanation: "Chronic bowel habit changes + normal evaluation + no alarm signs = IBS."
  },
  {
    topic: "Gastroenterology",
    vignette: "46M has progressive dysphagia, weight loss, and an irregular constricting esophageal mass on imaging.",
    answers: ["Benign stricture", "Achalasia", "Esophageal cancer", "GERD"],
    correct: 2,
    explanation: "Progressive dysphagia + weight loss + mass = esophageal cancer."
  },

  // ENDOCRINOLOGY
  {
    topic: "Endocrinology",
    vignette: "19M has polyuria, weight loss, abdominal pain, Kussmaul respirations, glucose 580, and positive serum ketones.",
    answers: ["Type 2 diabetes", "Diabetic ketoacidosis", "Hyperosmolar hyperglycemic state", "Hypoglycemia"],
    correct: 1,
    explanation: "Kussmaul respirations + hyperglycemia + ketones = DKA."
  },
  {
    topic: "Endocrinology",
    vignette: "68F with type 2 diabetes has glucose 900, severe dehydration, confusion, and minimal ketones.",
    answers: ["DKA", "HHS", "Lactic acidosis", "Hypoglycemia"],
    correct: 1,
    explanation: "Extreme hyperglycemia + dehydration + minimal ketones = HHS."
  },
  {
    topic: "Endocrinology",
    vignette: "58M has tremor, palpitations, weight loss, low TSH, and elevated free T4.",
    answers: ["Hypothyroidism", "Hyperthyroidism", "Thyroiditis only", "Central hypothyroidism"],
    correct: 1,
    explanation: "Low TSH + high free T4 = hyperthyroidism."
  },
  {
    topic: "Endocrinology",
    vignette: "42F has fatigue, cold intolerance, weight gain, high TSH, and low free T4.",
    answers: ["Hyperthyroidism", "Primary hypothyroidism", "Subclinical hypothyroidism", "Graves disease"],
    correct: 1,
    explanation: "High TSH + low free T4 = primary hypothyroidism."
  },
  {
    topic: "Endocrinology",
    vignette: "51M has resistant hypertension, hypokalemia, metabolic alkalosis, high aldosterone, and low renin.",
    answers: ["Primary hyperaldosteronism", "Diuretic use", "Secondary hyperaldosteronism", "Cushing syndrome"],
    correct: 0,
    explanation: "High aldosterone + low renin + hypokalemia = primary hyperaldosteronism."
  },
  {
    topic: "Endocrinology",
    vignette: "38F has central obesity, proximal weakness, easy bruising, high cortisol, and suppressed ACTH.",
    answers: ["Adrenal insufficiency", "Adrenal Cushing syndrome", "SIADH", "Pituitary Cushing disease"],
    correct: 1,
    explanation: "High cortisol + low ACTH = adrenal source of Cushing syndrome."
  },
  {
    topic: "Endocrinology",
    vignette: "26F has irregular menses, hirsutism, acne, insulin resistance, and polycystic ovaries.",
    answers: ["Cushing syndrome", "PCOS", "Androgen-secreting tumor", "Hyperprolactinemia"],
    correct: 1,
    explanation: "Oligomenorrhea + hyperandrogenism = PCOS."
  },
  {
    topic: "Endocrinology",
    vignette: "67M has calcium 11.2, elevated PTH, kidney stones, and subperiosteal bone resorption.",
    answers: ["Hypervitaminosis D", "Milk-alkali syndrome", "Primary hyperparathyroidism", "Thiazide effect"],
    correct: 2,
    explanation: "High calcium + high PTH = primary hyperparathyroidism."
  },
  {
    topic: "Endocrinology",
    vignette: "52F postmenopausal woman has DEXA T-score of -2.8 and no prior fractures.",
    answers: ["Normal bone density", "Osteopenia", "Osteoporosis", "Osteomalacia"],
    correct: 2,
    explanation: "T-score ≤ -2.5 = osteoporosis."
  },
  {
    topic: "Endocrinology",
    vignette: "41M has fasting hypoglycemia with high insulin, high C-peptide, and negative sulfonylurea screen.",
    answers: ["Factitious insulin use", "Insulinoma", "Sulfonylurea use", "Adrenal insufficiency"],
    correct: 1,
    explanation: "Hypoglycemia + high insulin/C-peptide + negative sulfonylurea = insulinoma."
  },

  // HEMATOLOGY
  {
    topic: "Hematology",
    vignette: "52F has fatigue, Hgb 7.2, MCV 68, ferritin 8, and elevated TIBC.",
    answers: ["Anemia of chronic disease", "Iron deficiency anemia", "Sideroblastic anemia", "Thalassemia"],
    correct: 1,
    explanation: "Low MCV + low ferritin + high TIBC = iron deficiency anemia."
  },
  {
    topic: "Hematology",
    vignette: "67M has fatigue, paresthesias, MCV 105, and elevated methylmalonic acid.",
    answers: ["Folate deficiency", "Vitamin B12 deficiency", "Hypothyroidism", "Reticulocytosis"],
    correct: 1,
    explanation: "Elevated methylmalonic acid = vitamin B12 deficiency."
  },
  {
    topic: "Hematology",
    vignette: "38F has jaundice, dark urine, high LDH, low haptoglobin, and positive direct Coombs test.",
    answers: ["Iron deficiency anemia", "Hereditary spherocytosis", "G6PD deficiency", "Autoimmune hemolytic anemia"],
    correct: 3,
    explanation: "Hemolysis + positive direct Coombs = autoimmune hemolytic anemia."
  },
  {
    topic: "Hematology",
    vignette: "4YO has recurrent pain crises, hemolytic anemia, splenomegaly, and HbS on electrophoresis.",
    answers: ["Thalassemia", "G6PD deficiency", "Sickle cell disease", "Hereditary spherocytosis"],
    correct: 2,
    explanation: "Pain crises + HbS = sickle cell disease."
  },
  {
    topic: "Hematology",
    vignette: "64M has pancytopenia, infections, bleeding, and markedly hypocellular bone marrow.",
    answers: ["ITP", "TTP", "DIC", "Aplastic anemia"],
    correct: 3,
    explanation: "Pancytopenia + hypocellular marrow = aplastic anemia."
  },
  {
    topic: "Hematology",
    vignette: "23F has fever, neurologic symptoms, AKI, thrombocytopenia, and schistocytes.",
    answers: ["ITP", "DIC", "TTP", "Hemophilia A"],
    correct: 2,
    explanation: "MAHA + thrombocytopenia + neurologic/renal findings = TTP."
  },
  {
    topic: "Hematology",
    vignette: "58M has WBC 95K, anemia, thrombocytopenia, 25% blasts, and Auer rods.",
    answers: ["CML", "Acute myeloid leukemia", "Leukemoid reaction", "CLL"],
    correct: 1,
    explanation: "Auer rods = AML."
  },
  {
    topic: "Hematology",
    vignette: "72M has bone pain, renal dysfunction, hypercalcemia, anemia, and M-spike on SPEP.",
    answers: ["Waldenström macroglobulinemia", "Multiple myeloma", "Hodgkin lymphoma", "CLL"],
    correct: 1,
    explanation: "CRAB features + M-spike = multiple myeloma."
  },
  {
    topic: "Hematology",
    vignette: "46F on warfarin has INR 8.5 but no bleeding.",
    answers: ["Fresh frozen plasma", "Vitamin K", "Platelet transfusion", "Protamine"],
    correct: 1,
    explanation: "Very high INR without bleeding = hold warfarin and give vitamin K."
  },
  {
    topic: "Hematology",
    vignette: "31M has fever, night sweats, weight loss, painless lymphadenopathy, and Reed-Sternberg cells.",
    answers: ["Non-Hodgkin lymphoma", "Hodgkin lymphoma", "Tuberculosis", "Reactive lymphadenopathy"],
    correct: 1,
    explanation: "Reed-Sternberg cells = Hodgkin lymphoma."
  },

  // INFECTIOUS DISEASE
  {
    topic: "Infectious Disease",
    vignette: "47M has fever, hypotension after fluids, altered mental status, and lactate 4.2.",
    answers: ["Septic shock", "Cardiogenic shock", "Anaphylaxis", "Stroke"],
    correct: 0,
    explanation: "Infection + persistent hypotension/lactate elevation = septic shock."
  },
  {
    topic: "Infectious Disease",
    vignette: "34M has fever, neck stiffness, petechial rash, and CSF with low glucose and neutrophils.",
    answers: ["Viral meningitis", "Bacterial meningitis", "TB meningitis", "Fungal meningitis"],
    correct: 1,
    explanation: "Low CSF glucose + neutrophils = bacterial meningitis."
  },
  {
    topic: "Infectious Disease",
    vignette: "28M has fever, confusion, seizures, and MRI showing temporal lobe enhancement.",
    answers: ["Bacterial meningitis", "Viral meningitis", "HSV encephalitis", "Fungal meningitis"],
    correct: 2,
    explanation: "Temporal lobe encephalitis = HSV encephalitis."
  },
  {
    topic: "Infectious Disease",
    vignette: "52M with prosthetic valve has fever, new murmur, and septic emboli.",
    answers: ["Endocarditis", "Pericarditis", "Myocarditis", "Pneumonia"],
    correct: 0,
    explanation: "Fever + new murmur + emboli = infective endocarditis."
  },
  {
    topic: "Infectious Disease",
    vignette: "39F has nonbloody diarrhea after eating undercooked poultry. Stool culture grows Salmonella; she is stable.",
    answers: ["Immediate antibiotics", "Supportive care", "Urgent surgery", "Antitoxin"],
    correct: 1,
    explanation: "Uncomplicated nontyphoidal Salmonella gastroenteritis = supportive care."
  },
  {
    topic: "Infectious Disease",
    vignette: "45M has cough, conjunctivitis, coryza, Koplik spots, and descending maculopapular rash.",
    answers: ["Rubella", "Measles", "Varicella", "Scarlet fever"],
    correct: 1,
    explanation: "Koplik spots + cough/coryza/conjunctivitis = measles."
  },
  {
    topic: "Infectious Disease",
    vignette: "31M has a painful genital ulcer with tender suppurative inguinal lymphadenopathy.",
    answers: ["HSV", "Syphilis", "Chancroid", "Granuloma inguinale"],
    correct: 2,
    explanation: "Painful ulcer + tender lymph nodes = chancroid."
  },
  {
    topic: "Infectious Disease",
    vignette: "27F with AIDS has dyspnea, dry cough, hypoxemia, and bilateral ground-glass infiltrates.",
    answers: ["Bacterial pneumonia", "Tuberculosis", "Pneumocystis pneumonia", "CMV pneumonitis"],
    correct: 2,
    explanation: "AIDS + dry cough + ground-glass infiltrates = Pneumocystis pneumonia."
  },
  {
    topic: "Infectious Disease",
    vignette: "52M has jaundice, ALT 1200, HBsAg positive, IgM anti-HBc positive, and HBeAg positive.",
    answers: ["Chronic hepatitis B", "Acute hepatitis B", "Hepatitis B immunity", "Resolved infection"],
    correct: 1,
    explanation: "IgM anti-HBc = acute hepatitis B."
  },
  {
    topic: "Infectious Disease",
    vignette: "48M returns from a malaria-endemic region with cyclic fevers, chills, jaundice, and anemia.",
    answers: ["Dengue", "Typhoid fever", "Malaria", "Leptospirosis"],
    correct: 2,
    explanation: "Cyclic fever after endemic travel = malaria."
  },

  // NEUROLOGY
  {
    topic: "Neurology",
    vignette: "67M has sudden right-sided weakness and aphasia. Last known well was 2 hours ago.",
    answers: ["TIA", "Hemorrhagic stroke", "Acute ischemic stroke", "Todd paralysis"],
    correct: 2,
    explanation: "Sudden focal neurologic deficit within thrombolysis window = acute ischemic stroke."
  },
  {
    topic: "Neurology",
    vignette: "54F has sudden thunderclap headache, neck stiffness, and photophobia. Initial CT is normal.",
    answers: ["Tension headache", "Migraine", "Subarachnoid hemorrhage", "Cluster headache"],
    correct: 2,
    explanation: "Thunderclap headache = subarachnoid hemorrhage until proven otherwise."
  },
  {
    topic: "Neurology",
    vignette: "8YO has generalized seizure lasting 7 minutes and ongoing epileptiform activity.",
    answers: ["Simple febrile seizure", "Status epilepticus", "Absence seizure", "Syncope"],
    correct: 1,
    explanation: "Seizure lasting ≥5 minutes = status epilepticus."
  },
  {
    topic: "Neurology",
    vignette: "42F has acute unilateral facial paralysis involving the forehead and inability to close the eye.",
    answers: ["Stroke", "Bell palsy", "Trigeminal neuralgia", "Myasthenia gravis"],
    correct: 1,
    explanation: "Complete unilateral facial weakness including forehead = peripheral CN VII palsy."
  },
  {
    topic: "Neurology",
    vignette: "38M has ascending weakness, areflexia, and worsening respiratory effort after recent gastroenteritis.",
    answers: ["Transverse myelitis", "Guillain-Barré syndrome", "ALS", "Spinal cord compression"],
    correct: 1,
    explanation: "Ascending weakness + areflexia after infection = GBS."
  },
  {
    topic: "Neurology",
    vignette: "55F has progressive memory loss over years with impaired daily functioning and medial temporal atrophy.",
    answers: ["Vascular dementia", "Lewy body dementia", "Frontotemporal dementia", "Alzheimer disease"],
    correct: 3,
    explanation: "Progressive memory-predominant dementia = Alzheimer disease."
  },
  {
    topic: "Neurology",
    vignette: "31M has ptosis, diplopia, and weakness worse with use; anti-acetylcholine receptor antibodies are positive.",
    answers: ["Myasthenia gravis", "Lambert-Eaton syndrome", "Polymyositis", "Thyroid eye disease"],
    correct: 0,
    explanation: "Fatigable weakness + AChR antibodies = myasthenia gravis."
  },
  {
    topic: "Neurology",
    vignette: "58M has asymmetric resting tremor, bradykinesia, cogwheel rigidity, and shuffling gait.",
    answers: ["Essential tremor", "Parkinson disease", "Cerebellar ataxia", "Dystonia"],
    correct: 1,
    explanation: "Resting tremor + bradykinesia + rigidity = Parkinson disease."
  },
  {
    topic: "Neurology",
    vignette: "24F has optic neuritis, prior transverse myelitis, and multiple periventricular white-matter lesions.",
    answers: ["TIA", "Migraine", "Multiple sclerosis", "Stroke"],
    correct: 2,
    explanation: "Neurologic lesions separated in time and space = multiple sclerosis."
  },
  {
    topic: "Neurology",
    vignette: "68M has episodic vertigo, unilateral hearing loss, tinnitus, and ear fullness.",
    answers: ["BPPV", "Vestibular neuritis", "Ménière disease", "Central vertigo"],
    correct: 2,
    explanation: "Vertigo + hearing loss + tinnitus/aural fullness = Ménière disease."
  },

  // PSYCHIATRY
  {
    topic: "Psychiatry",
    vignette: "32F has 3 weeks of depressed mood, anhedonia, insomnia, guilt, poor concentration, and suicidal thoughts.",
    answers: ["Adjustment disorder", "Major depressive disorder", "Persistent depressive disorder", "Bipolar disorder"],
    correct: 1,
    explanation: "≥5 depressive symptoms for ≥2 weeks = major depressive disorder."
  },
  {
    topic: "Psychiatry",
    vignette: "28M has 1 week of decreased sleep, grandiosity, pressured speech, impulsive spending, and hospitalization.",
    answers: ["ADHD", "Mania", "Generalized anxiety disorder", "Hypomania"],
    correct: 1,
    explanation: "Manic symptoms for ≥1 week or requiring hospitalization = mania."
  },
  {
    topic: "Psychiatry",
    vignette: "45M has excessive worry about work, health, and family on most days for 8 months.",
    answers: ["Social anxiety disorder", "Generalized anxiety disorder", "Panic disorder", "Specific phobia"],
    correct: 1,
    explanation: "Excessive worry about multiple domains for ≥6 months = GAD."
  },
  {
    topic: "Psychiatry",
    vignette: "35F has recurrent sudden episodes of palpitations, sweating, dyspnea, and fear of dying.",
    answers: ["Generalized anxiety disorder", "Specific phobia", "Panic disorder", "Social anxiety disorder"],
    correct: 2,
    explanation: "Recurrent unexpected panic attacks = panic disorder."
  },
  {
    topic: "Psychiatry",
    vignette: "52M veteran has nightmares, intrusive memories, avoidance, and hypervigilance for 6 months.",
    answers: ["Adjustment disorder", "PTSD", "Acute stress disorder", "Generalized anxiety disorder"],
    correct: 1,
    explanation: "Trauma symptoms lasting >1 month = PTSD."
  },
  {
    topic: "Psychiatry",
    vignette: "28F has intrusive contamination fears and repeatedly washes hands despite recognizing the behavior is excessive.",
    answers: ["Generalized anxiety disorder", "Specific phobia", "OCD", "Body dysmorphic disorder"],
    correct: 2,
    explanation: "Obsessions + compulsions = OCD."
  },
  {
    topic: "Psychiatry",
    vignette: "24M has hallucinations, delusions, disorganized speech, and functional decline for 8 months.",
    answers: ["Brief psychotic disorder", "Schizophreniform disorder", "Schizophrenia", "Delusional disorder"],
    correct: 2,
    explanation: "Psychosis with functional decline for ≥6 months = schizophrenia."
  },
  {
    topic: "Psychiatry",
    vignette: "41F has binge eating followed by vomiting and excessive exercise. BMI is normal.",
    answers: ["Anorexia nervosa", "Bulimia nervosa", "Binge eating disorder", "Avoidant restrictive food intake disorder"],
    correct: 1,
    explanation: "Binge eating + compensatory behaviors + normal BMI = bulimia nervosa."
  },
  {
    topic: "Psychiatry",
    vignette: "49M has tremor, agitation, tachycardia, and hypertension 12 hours after his last drink.",
    answers: ["Wernicke encephalopathy", "Alcohol withdrawal", "Delirium tremens", "Hepatic encephalopathy"],
    correct: 1,
    explanation: "Autonomic hyperactivity within hours after stopping alcohol = alcohol withdrawal."
  },
  {
    topic: "Psychiatry",
    vignette: "38M has grandiosity, need for admiration, entitlement, exploitative behavior, and lack of empathy.",
    answers: ["Borderline personality disorder", "Narcissistic personality disorder", "Antisocial personality disorder", "Histrionic personality disorder"],
    correct: 1,
    explanation: "Grandiosity + need for admiration + lack of empathy = narcissistic personality disorder."
  },

  // RHEUMATOLOGY
  {
    topic: "Rheumatology",
    vignette: "52F has symmetric MCP/PIP pain, morning stiffness for 2 hours, erosions, and positive RF.",
    answers: ["Osteoarthritis", "Rheumatoid arthritis", "Systemic lupus erythematosus", "Gout"],
    correct: 1,
    explanation: "Symmetric small-joint inflammatory arthritis = rheumatoid arthritis."
  },
  {
    topic: "Rheumatology",
    vignette: "35F has malar rash, photosensitivity, oral ulcers, arthritis, positive ANA, and anti-dsDNA.",
    answers: ["Sjögren syndrome", "Systemic sclerosis", "Systemic lupus erythematosus", "Mixed connective tissue disease"],
    correct: 2,
    explanation: "Malar rash + anti-dsDNA = SLE."
  },
  {
    topic: "Rheumatology",
    vignette: "48M has acute painful swollen knee. Arthrocentesis shows needle-shaped negatively birefringent crystals.",
    answers: ["Rheumatoid arthritis", "Pseudogout", "Gout", "Septic arthritis"],
    correct: 2,
    explanation: "Needle-shaped negatively birefringent crystals = gout."
  },
  {
    topic: "Rheumatology",
    vignette: "64F has acute knee pain. Arthrocentesis shows rhomboid positively birefringent crystals.",
    answers: ["Gout", "Pseudogout", "Rheumatoid arthritis", "Septic arthritis"],
    correct: 1,
    explanation: "Rhomboid positively birefringent crystals = pseudogout."
  },
  {
    topic: "Rheumatology",
    vignette: "67M has bilateral shoulder and hip aching, morning stiffness, and ESR 78.",
    answers: ["Rheumatoid arthritis", "Polymyalgia rheumatica", "Polymyositis", "Osteoarthritis"],
    correct: 1,
    explanation: "Older patient + shoulder/hip stiffness + high ESR = polymyalgia rheumatica."
  },
  {
    topic: "Rheumatology",
    vignette: "72F has temporal headache, jaw claudication, visual loss, and elevated ESR.",
    answers: ["Polymyalgia rheumatica", "Giant cell arteritis", "Takayasu arteritis", "Polyarteritis nodosa"],
    correct: 1,
    explanation: "Temporal headache + jaw claudication + visual symptoms = giant cell arteritis."
  },
  {
    topic: "Rheumatology",
    vignette: "58M has tight skin of hands, Raynaud phenomenon, dysphagia, and anti-Scl-70 antibodies.",
    answers: ["SLE", "Sjögren syndrome", "Systemic sclerosis", "Mixed connective tissue disease"],
    correct: 2,
    explanation: "Skin tightening + Raynaud + esophageal dysmotility = systemic sclerosis."
  },
  {
    topic: "Rheumatology",
    vignette: "41M has inflammatory back pain, morning stiffness, sacroiliitis, and HLA-B27 positivity.",
    answers: ["Osteoarthritis", "Rheumatoid arthritis", "Ankylosing spondylitis", "Gout"],
    correct: 2,
    explanation: "Inflammatory back pain + sacroiliitis = ankylosing spondylitis."
  },
  {
    topic: "Rheumatology",
    vignette: "44F has dry eyes, dry mouth, parotid enlargement, arthritis, and anti-Ro/SSA antibodies.",
    answers: ["SLE", "Rheumatoid arthritis", "Sjögren syndrome", "Systemic sclerosis"],
    correct: 2,
    explanation: "Dry eyes/mouth + anti-Ro/SSA = Sjögren syndrome."
  },
  {
    topic: "Rheumatology",
    vignette: "52M has palpable purpura, hematuria, pulmonary symptoms, and p-ANCA positivity.",
    answers: ["Polyarteritis nodosa", "Microscopic polyangiitis", "Granulomatosis with polyangiitis", "Takayasu arteritis"],
    correct: 1,
    explanation: "Small-vessel vasculitis + p-ANCA + renal/pulmonary findings = microscopic polyangiitis."
  },
];

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
