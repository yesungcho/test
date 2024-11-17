import React, { useState } from 'react';
import './App.css';

function App() {
  const molecules = [
    {
      "name": "Osteocalcin (OC)",
      "expected_values": "Younger than 18 years: Not established; 18 years or older: 9-42 ng/mL",
      "measurement_methods": ["Midmolecule osteocalcin radioimmunoassay", "ELISA"],
      "electrochemical_detection": false,
      "notes": "Often detected via specific antigens available for sale on clonetech.com",
      "source": "http://www.clontech.com/US/Products/Cell_Biology_and_Epigenetics/Bone_Research/Osteocalcin_Human"
    },
    {
      "name": "Glutathione peroxidase 1 (GPx)",
      "expected_values": "Females: 29100 ng/mL; Males: 24200 ng/mL",
      "measurement_methods": ["Colorimetric Assay", "ELISA"],
      "electrochemical_detection": false,
      "detection_antibodies": "Anti-Glutathione Peroxidase 1 antibody (ab22604)",
      "solvent": "Preservative: 0.02% Sodium Azide; Constituents: 1% BSA, PBS, pH 7.4"
    },
    {
      "name": "Bone sialoprotein (BSAP)",
      "expected_values": "Adults: 10–30 ngEq/mL",
      "measurement_methods": ["Immunoblot"],
      "electrochemical_detection": false,
      "detection_antibodies": "Anti-Bone Sialoprotein antibody (ab52128)",
      "solvent": "AR buffers citrate pH 6.1 in a DAKO PT link, 3% H₂O₂ in methanol for 10 mins, blocked with Dako Protein block for 10 mins (containing casein 0.25% in PBS)",
      "source": "http://www.abcam.com/bone-sialoprotein-antibody-ab52128.html"
    },
    {
      "name": "Osteoprotegerin (OPG)",
      "expected_values": "Serum: 0.17 ng/mL; Plasma: 0.14 ng/mL",
      "measurement_methods": ["ELISA", "RT-PCR"],
      "electrochemical_detection": false,
      "detection_antibodies": "Anti-OPG/Osteoprotegerin Antibody LS-C104334",
      "solvent": "PBS, pH 7.2"
    },
    {
      "name": "Receptor Activator of Nuclear Factor κB (RANK)",
      "expected_values": "Children between 6-18 years: Approx. 0.05 ng/mL",
      "measurement_methods": ["ELISA"],
      "electrochemical_detection": false,
      "detection_antibodies": "Human RANK/TNFRSF11A Antibody",
      "source": "https://www.rndsystems.com/products/human-rank-tnfrsf11a-antibody-80704_mab683"
    },
    {
      "name": "Soluble Receptor Activator of Nuclear Factor κB (sRANKL)",
      "expected_values": "Adult females: 0.29 to 67.64",
      "measurement_methods": ["ampli sRANKL human ELISA"],
      "electrochemical_detection": false,
      "solvent": "No additional solvent",
      "source": "http://arthritis-research.biomedcentral.com/articles/10.1186/ar3500"
    },
    {
      "name": "Osteogenic protein-1 (OP)",
      "expected_values": "In articular cartilage",
      "measurement_methods": ["Western Blot", "Sandwich ELISA", "RT-PCR"],
      "electrochemical_detection": false,
      "detection_antibodies": ["R2854", "MAB354", "1B12", "sc-9305"],
      "source": "http://www.sciencedirect.com/science/article/pii/"
    },
    {
      "name": "Vitamin D",
      "expected_values": "20–50 ng/mL",
      "measurement_methods": ["Cyclic voltammetry"],
      "electrochemical_detection": true,
      "solvent": "40% ethanol/60% water solution with lithium perchlorate as the support electrolyte; ethanol, acetonitrile, and dichloromethane",
      "source": "http://onlinelibrary.wiley.com/doi/10.1002/elan.201400451/full"
    },
    {
      "name": "Cardiac Troponin (cTnI)",
      "expected_values": "Normal levels: ≤0.4 ng/mL; Risk of heart attack: ≥2.0 ng/mL",
      "measurement_methods": ["Cyclic voltammetry"],
      "electrochemical_detection": true,
      "reference_electrode": "Ag/AgCl",
      "indicator_electrode": "KCl",
      "solvent": "Potassium ferrocyanide",
      "source": "https://www.researchgate.net/publication/255176778_An_ultrasensitive_molecularly-imprinted_human_cardiac_troponin_sensor"
    },
    {
      "name": "Creatinine Kinase",
      "expected_values": "Adult males: 5000–12000 ng/mL; Adult females: 4000–11000 ng/mL; Children (up to 12 years): 0–7000 ng/mL",
      "measurement_methods": ["Cyclic voltammetry"],
      "electrochemical_detection": true,
      "reference_electrode": "Screen-printed carbon electrodes (SPCEs)",
      "indicator_electrode": "Carbon inks",
      "solvent": "PBS (0.01 mol/L, pH 7.0)",
      "source": "http://www.ncbi.nlm.nih.gov/pmc/articles/PMC4122006/"
    },
    {
      "name": "High-Sensitivity C-reactive Protein (hsCRP)",
      "expected_values": "Low risk: <1000 ng/mL; Normal: 1000–3000 ng/mL; High risk: >3000 ng/mL",
      "measurement_methods": ["Immunoenzymometric assay"],
      "electrochemical_detection": false,
      "solvent": "Biotin-labeled monoclonal antibody, enzyme-labeled antibody, native antigen",
      "source": "https://system.netsuite.com/core/media/media.nl?id=1295&c=445858&h=e9e267ca6a558496bbec&_xt=.pdf"
    },
    {
      "name": "Atrial Natriuretic Peptide (ANP)",
      "expected_values": "0.0161 ± 0.0086 ng/mL; 0.0000052 ± 0.0000028 nmol/mL",
      "measurement_methods": ["Absorbance", "ELISA"],
      "electrochemical_detection": false,
      "solvent": "Streptavidin-peroxidase conjugate, tetramethylbenzidine",
      "source": "http://www.sciencedirect.com/science/article/pii/S0009898101005782"
    },
    {
      "name": "Brain Natriuretic Peptide (BNP)",
      "expected_values": "Approximately 0.02 ng/mL",
      "measurement_methods": ["Electrochemical enzyme immunoassay"],
      "electrochemical_detection": true,
      "reference_electrode": "Ag/AgCl",
      "indicator_electrode": "AChE-labeled anti-BNP antibodies",
      "source": "http://pubs.acs.org/doi/full/10.1021/ac040190m"
    },
    {
      "name": "Beta 2 Microglobulin (B2M)",
      "expected_values": "Urine: 0–300 ng/mL; Serum or plasma: 0–0.300 ng/mL",
      "measurement_methods": ["ELISA"],
      "electrochemical_detection": false,
      "solvent": "Antibody-enzyme conjugate, buffer solution, TMB substrate",
      "source": "https://www.4adi.com/objects/catalog/product/extras/0020.pdf"
    },
    {
      "name": "Angiotensin II",
      "expected_values": "0.01–0.03 ng/mL",
      "measurement_methods": ["ELISA"],
      "electrochemical_detection": false,
      "solvent": "EIA Angiotensin II Peptide standard, Anti-Angiotensin II Detection Antibody, Biotinylated Angiotensin II Peptide, HRP-Streptavidin",
      "source": "http://www.sigmaaldrich.com/catalog/product/sigma/rab0010"
    },
    {
      "name": "Helical Peptide",
      "measurement_methods": ["Enzyme immunoassay"],
      "electrochemical_detection": false,
      "reference_electrode": "Monoclonal anti-helical peptide antibody",
      "source": "https://www.quidel.com/sites/default/files/product/documents/mvb_hel_peptie_pi.pdf"
    },
    {
      "name": "Homocysteine",
      "expected_values": "5–15 nmol/mL",
      "measurement_methods": ["HPLC", "MS", "ELISA"],
      "electrochemical_detection": false,
      "solvent": "Anti-Homocysteine Antibody, Secondary Antibody HRP Conjugate, Homocysteine Conjugate",
      "source": "http://www.cellbiolabs.com/sites/default/files/STA-670-homocysteine-elisa-kit.pdf"
    },
    {
      "name": "Methylmalonic Acid (MMA)",
      "expected_values": "Serum and urinary MMA >0.4 µmol/L indicate cobalamin deficiency",
      "measurement_methods": ["HPLC", "MS", "ELISA"],
      "electrochemical_detection": false,
      "solvent": "Biotin-labeled MMA, monoclonal antibody specific to MMA, Avidin-HRP",
      "source": "http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3755585/"
    },
    {
      "name": "Myostatin",
      "expected_values": "0.15–37.50 ng/mL",
      "measurement_methods": ["ELISA"],
      "electrochemical_detection": false,
      "solvent": "0.2 M glycine–HCl pH 2.5 or 50 mM Tris–HCl pH 8.0, 500 mM NaCl, 1 mM glycine, 0.05% Tween-20",
      "source": "http://www.sciencedirect.com/science/article/pii/S0303720709000264"
    },
    {
      "name": "TNFα",
      "expected_values": "0.0112 ± 0.00731 ng/mL",
      "measurement_methods": ["Sandwich immunoassay"],
      "electrochemical_detection": false,
      "solvent": "PBST with 0.02% BSA (PBST–BSA)",
      "source": "http://www.sciencedirect.com/science/"
    },
    {
      "name": "IL1β",
      "expected_values": "0.00048–0.1 ng/mL",
      "measurement_methods": ["Sandwich enzyme immunoassay"],
      "electrochemical_detection": false,
      "source": "https://resources.rndsystems.com/pdfs/datasheets/dlb50.pdf"
    }, 
    {
      "name": "IL-4",
      "expected_values": "0.001372 ± 0.00026 ng/mL",
      "measurement_methods": ["ELISA"],
      "electrochemical_detection": false,
      "solvent": "Biotinylated antibody, buffers",
      "source": "http://ac.els-cdn.com/S1043466696901970/1-s2.0-S1043466696901970-main.pdf"
    },
    {
      "name": "IL-6",
      "expected_values": "0.01–0.075 ng/mL",
      "measurement_methods": ["Photoelectrochemical immunoassay"],
      "electrochemical_detection": true,
      "reference_electrode": "TiO₂/CdS hybrid",
      "solvent": "Ascorbic acid, glutaraldehyde, chitosan solution",
      "source": "http://hysz.nju.edu.cn/jjzhu/userfiles/files/fblw/2014-15-A%20new.pdf"
    },
    {
      "name": "IL-8",
      "expected_values": "0.0015–0.0075 ng/mL",
      "measurement_methods": ["ELISA"],
      "electrochemical_detection": false,
      "source": "https://resources.rndsystems.com/pdfs/datasheets/d8000c.pdf"
    },
    {
      "name": "IL-10",
      "expected_values": "0.0039 ng/mL",
      "measurement_methods": ["Solid Phase Sandwich ELISA"],
      "electrochemical_detection": false,
      "source": "https://resources.rndsystems.com/pdfs/datasheets/d1000b.pdf"
    },
    {
      "name": "TGFβ",
      "expected_values": "0.0017–0.0154 ng/mL; Mean: 0.00461 ng/mL",
      "measurement_methods": ["Quantitative sandwich enzyme immunoassay"],
      "electrochemical_detection": false,
      "source": "https://resources.rndsystems.com/pdfs/datasheets/db100b.pdf"
    },
    {
      "name": "NF-κB",
      "expected_values": "0.156–10 ng/mL",
      "measurement_methods": ["Sandwich enzyme immunoassay"],
      "electrochemical_detection": false,
      "source": "http://www.kamiyabiomedical.com/pdf/KT-23802.pdf"
    },
    {
      "name": "IFN gamma",
      "expected_values": "0.0102 ± 0.0034 ng/mL",
      "measurement_methods": ["Solid Phase Sandwich ELISA"],
      "electrochemical_detection": false,
      "source": "https://resources.rndsystems.com/pdfs/datasheets/dif50.pdf"
    },
    {
      "name": "Neopterin",
      "expected_values": "0.0052 ± 0.0025 nmol/mL",
      "measurement_methods": ["Electrochemical immunoassay"],
      "electrochemical_detection": true,
      "reference_electrode": "Silver",
      "indicator_electrode": "Graphite",
      "solvent": "Various buffers (solutions A, B, and C)",
      "source": "http://www.sciencedirect.com/science/article/pii/S0039914014008819"
    },
    {
      "name": "Nitric Oxide Synthase (NOS)",
      "expected_values": "Adults: Mean value 73.8 nmol/mL",
      "measurement_methods": ["Absorbance", "ELISA"],
      "electrochemical_detection": false,
      "source": "http://www.clinchem.org/content/46/10/1626.full"
    },
    {
      "name": "Superoxide Dismutase (SOD)",
      "expected_values": "Adults: 30.4 ± 5.27 U/mL",
      "measurement_methods": ["Cyclic voltammetry"],
      "electrochemical_detection": true,
      "reference_electrode": "Saturated calomel electrode (SCE)",
      "indicator_electrode": "L-Cysteine Gold Electrode",
      "counter_electrode": "Platinum wire",
      "solvent": "25 mM phosphate buffer solution",
      "source": "http://nopr.niscair.res.in/bitstream/123456789/14531/1/IJCA%2051A(8)%201057-1063.pdf"
    },
    {
      "name": "Thioredoxin",
      "expected_values": "74.60–89.59 ng/mL",
      "measurement_methods": ["Cyclic voltammetry (for Thioredoxin reductases)"],
      "electrochemical_detection": true,
      "reference_electrode": "Calomel reference electrode",
      "indicator_electrode": "Pyrolytic graphite edge (PGE) working electrode",
      "counter_electrode": "Platinum wire counter electrode",
      "source": "http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3982938/"
    },
    {
      "name": "Norepinephrine",
      "measurement_methods": ["Cyclic voltammetry"],
      "electrochemical_detection": true,
      "reference_electrode": "Ag/AgCl",
      "indicator_electrode": "Graphene-modified glassy carbon electrode",
      "source": "http://www.electrochemsci.org/papers/vol7/7020991.pdf"
    },
    {
      "name": "Epinephrine",
      "measurement_methods": ["Cyclic voltammetry"],
      "electrochemical_detection": true,
      "reference_electrode": "Saturated calomel electrode (SCE)",
      "indicator_electrode": "Bare or modified gold working electrode",
      "counter_electrode": "Platinum wire",
      "source": "http://www.electrochemsci.org/papers/1050238.pdf"
    },
    {
      "name": "Cortisol",
      "measurement_methods": ["Cyclic voltammetry"],
      "electrochemical_detection": true,
      "reference_electrode": "Saturated calomel electrode (SCE)",
      "indicator_electrode": "Bare or modified gold working electrode"
    },
    {
      "name": "Testosterone",
      "expected_values": "2.7–10.7 ng/mL",
      "measurement_methods": ["Amperometry"],
      "electrochemical_detection": true,
      "reference_electrode": "Silver pseudo-reference electrode",
      "counter_electrode": "Carbon counter electrode",
      "source": "http://pubs.rsc.org/en/content/articlehtml/2016/AY/C5AY02796A"
    },
    {
      "name": "Estradiol",
      "expected_values": "0.01–0.04 ng/mL (men)",
      "measurement_methods": ["Cyclic voltammetry"],
      "electrochemical_detection": true,
      "indicator_electrode": "200 µm gold electrode with immobilized ssDNA aptamer",
      "source": "https://www.researchgate.net/figure/6678696_fig1_Fig-5-Specificity-test-of-the-electrochemical-detection-system-1-nM-aptamer"
    },
    {
      "name": "Parathyroid Hormone (PTH)",
      "expected_values": "0.01–0.065 ng/mL",
      "measurement_methods": ["Electrochemical impedance", "Cyclic voltammetry"],
      "electrochemical_detection": true,
      "reference_electrode": "Ag/AgCl (saturated KCl)",
      "indicator_electrode": "Gold electrode modified by 12-mercapto dodecanoic acid",
      "counter_electrode": "Platinum",
      "detection_limit": "0.00001–0.00006 ng/mL",
      "source": "http://www.ncbi.nlm.nih.gov/pubmed/25683333"
    },
    {
      "name": "Prostaglandin F2alpha (PGF2α)",
      "expected_values": "0.025–0.150 ng/mL",
      "measurement_methods": ["ELISA"],
      "electrochemical_detection": false,
      "detection_limit": "0.00671 ng/mL",
      "source": "http://www.abnova.com/products/products_detail.asp?catalog_id=KA0310"
    },
    {
      "name": "Aldosterone",
      "expected_values": "2.09 ng/mL (0.000055–0.00025 pmol/L)",
      "measurement_methods": ["ELISA"],
      "electrochemical_detection": false,
      "detection_limit": "0.0047 ng/mL",
      "source": "http://www.enzolifesciences.com/ADI-900-173/aldosterone-elisa-kit/"
    },
    {
      "name": "Renin",
      "expected_values": "1.9–3.7 ng/mL/hour",
      "measurement_methods": ["ELISA"],
      "electrochemical_detection": false,
      "detection_limit": "0.0148 ng/mL",
      "source": "https://www.rndsystems.com/products/human-renin-quantikine-elisa-kit_dren00"
    },
    {
      "name": "Total Plasma Proteins",
      "expected_values": "0.031–2 ng/mL",
      "measurement_methods": ["ELISA"],
      "electrochemical_detection": false,
      "detection_limit": "<0.012 ng/mL",
      "source": "https://www.thermofisher.com/order/catalog/product/KHB0041"
    },
    {
      "name": "Glyphosate",
      "expected_values": "Maximum acceptable value: 1.75 mg/kg body weight",
      "measurement_methods": ["Cyclic voltammetry"],
      "electrochemical_detection": true,
      "indicator_electrode": "Glassy carbon electrode with copper phthalocyanine/multiwalled carbon nanotube film",
      "notes": "Carbon paste electrodes are better for routine analysis"
    },
    {
      "name": "Imidacloprid",
      "measurement_methods": ["Cyclic voltammetry"],
      "electrochemical_detection": true,
      "reference_electrode": "Saturated calomel electrode (SCE)",
      "indicator_electrode": "Glassy carbon electrode",
      "counter_electrode": "Platinum foil",
      "source": "http://www.sciencedirect.com/science/article/pii/S0925400513004103"
    },
    {
      "name": "Chloropicrin",
      "measurement_methods": ["Gas chromatography and mass spectrometry"],
      "electrochemical_detection": false,
      "notes": "Chloropicrin is light-sensitive",
      "source": "http://pubs.acs.org/doi/pdf/10.1021/ac048071u"
    },
    {
      "name": "Telone",
      "measurement_methods": ["Quartz crystal electrode sensor", "Gas chromatography"],
      "electrochemical_detection": true,
      "indicator_electrode": "SiO₂-MIP nanocomposite particles coated on quartz crystal electrode",
      "source": "https://www.researchgate.net/publication/270969929_Modification_of_a_QCN_sensor_by_SiO2_nanoparticles_and_MIP_for_telone_determination_Improving_its_selectivity_and_sensitivity"
    }
  ];
  

    

  const [selectedColumns, setSelectedColumns] = useState({
    expected_values: true,
    solvent: true,
    measurement_methods: true,
    electrochemical_detection: true,
    notes: true,
    indicator_electrode: true,
    source: true
  });

  const toggleColumn = (column) => {
    setSelectedColumns((prevState) => ({
      ...prevState,
      [column]: !prevState[column],
    }));
  };

  return (
    <div>
      <h1>Biomolecule Database</h1>

      Select Columns:
      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={selectedColumns.expected_values}
            onChange={() => toggleColumn("expected_values")}
          />
          Expected Values
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedColumns.solvent}
            onChange={() => toggleColumn("solvent")}
          />
          Solvent
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedColumns.measurement_methods}
            onChange={() => toggleColumn("measurement_methods")}
          />
          Measurement Methods
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedColumns.electrochemical_detection}
            onChange={() => toggleColumn("electrochemical_detection")}
          />
          Electrochemical Detection
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedColumns.notes}
            onChange={() => toggleColumn("notes")}
          />
          Notes
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedColumns.indicator_electrode}
            onChange={() => toggleColumn("indicator_electrode")}
          />
          Indicator Electrode
        </label>
        <label>
          <input
            type="checkbox"
            checked={selectedColumns.source}
            onChange={() => toggleColumn("source")}
          />
          Source
        </label>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            {selectedColumns.expected_values && <th>Expected Values</th>}
            {selectedColumns.solvent && <th>Solvent</th>}
            {selectedColumns.measurement_methods && <th>Measurement Methods</th>}
            {selectedColumns.electrochemical_detection && <th>Electrochemical Detection</th>}
            {selectedColumns.notes && <th>Notes</th>}
            {selectedColumns.indicator_electrode && <th>Indicator Electrode</th>}
            {selectedColumns.source && <th>Source</th>}
          </tr>
        </thead>
        <tbody>
          {molecules.map((mol, index) => (
            <tr key={index}>
              <td>{mol.name}</td>
              {selectedColumns.expected_values && <td>{mol.expected_values}</td>}
              {selectedColumns.solvent && <td>{mol.solvent || "N/A"}</td>}
              {selectedColumns.measurement_methods && <td>{mol.measurement_methods.join(", ")}</td>}
              {selectedColumns.electrochemical_detection && <td>{mol.electrochemical_detection ? "True" : "False"}</td>}
              {selectedColumns.notes && <td>{mol.notes || "N/A"}</td>}
              {selectedColumns.indicator_electrode && <td>{mol.indicator_electrode || "N/A"}</td>}
              {selectedColumns.source && (
                <td>
                  {mol.source ? (
                    <a href={mol.source} target="_blank" rel="noopener noreferrer">
                      🔗
                    </a>
                  ) : "N/A"}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
