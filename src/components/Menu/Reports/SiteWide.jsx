import React, { useState } from "react";
import css from "../../../styles/Menu/Reports/SiteWide.module.css";
import style from "../../../styles/Menu/Reports/Company.module.css";
import { Link, useNavigate ,NavLink} from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getSupplyAndDemand,
  getTopSearch,
  getTopSearchByManufacturer,
} from "../../../ReduxStore/Reports";
import Cookies from "js-cookie";
import SearchCompanyInventory from "./SearchCompanyInventory";
import myProfile from "../../../styles/Menu/Manage/MyProfile.module.css";

const SiteWide = () => {



  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  console.log(selectedManufacturer);
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToSupplyAndDemand = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const supplyAndDemandQuery = Object.fromEntries(formData.entries());
    dispatch(getSupplyAndDemand({ token, supplyAndDemandQuery }));
    navigate(
      `/reports/SupplyAndDemand?query=${supplyAndDemandQuery.partModel}`,
      { replace: true }
    );
  };

  const goToTopSearches = (e, parameter) => {
    console.log("Why Im Running?", e, parameter);
    e.preventDefault();
    // console.log(parameter)
    dispatch(getTopSearch({ token, parameter }));
    navigate(`/reports/topSearches?query=${parameter}`, {
      replace: true,
    });
  };

  const goToTopSearchesWithManufacturer = (e, parameter) => {
    e.preventDefault();
    if (!selectedManufacturer || selectedManufacturer === "Pick One") {
      alert("Please select a manufacturer before performing the search.");
      return;
    }
    dispatch(
      getTopSearchByManufacturer({
        token,
        parameter,
        mfg: selectedManufacturer,
      })
    );
    navigate(
      `/reports/topSearchWithManufacturer?query=${parameter}&manufacturer=${encodeURIComponent(
        selectedManufacturer
      )}`,
      { replace: true }
    );
  };

  return (
<>

    <div className={style.container}>
      {/* Navigation Tabs */}
      <div className={myProfile.profileInfo_links}>
            <ul>
              <li>
                <NavLink
                  to="/reports/Company"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Company</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reports/sitewide"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Site Wide</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reports/email"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Email</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reports/serviceStats"
                  className={({ isActive }) => (isActive ? myProfile.active : '')}
                >
                  <span>Stats</span>
                </NavLink>
              </li>
            </ul>
          </div>

      <div className={style.mainBody}>
        {/* Top 200 Searched Parts For */}
        <div className={css.section}>
          <h3>Top 200 Searched Parts For</h3>
          <div className={css.buttons}>
            <button
              className={css.orangeButton}
              onClick={(e) => goToTopSearches(e, "yesterday")}
            >
              Yesterday
            </button>
            <button
              className={css.orangeButton}
              onClick={(e) => goToTopSearches(e, "last_7_days")}
            >
              Last 7 Days
            </button>
            <button
              className={css.orangeButton}
              onClick={(e) => goToTopSearches(e, "last_month")}
            >
              Last 30 Days
            </button>
          </div>
        </div>

        {/* Top 200 Searched Parts For with Manufacturer Search */}
        <div className={css.section}>
          <h3>Top 200 Searched Parts For with Manufacturer Search</h3>
          <div className={css.display}>
            <label htmlFor="manufacturer">Manufacturer Search</label>
            <select
              name="platform"
              id="manufacturer"
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
            >
              <option value="Pick One"> Pick One </option>
              <option>3COM</option>
              <option>3DLABS</option>
              <option>3M</option>
              <option>3RD PARTY</option>
              <option>3WARE</option>
              <option>A-POWER</option>
              <option>AAEON</option>
              <option>ABBOT</option>
              <option>ABIT</option>
              <option>ABLECOM</option>
              <option>ACCELGRAPHICS</option>
              <option>ACCUTONE</option>
              <option>ACER</option>
              <option>ACME PACKET</option>
              <option>ACP</option>
              <option>ACTEL</option>
              <option>ADAPTEC</option>
              <option>ADC</option>
              <option>ADDONICS</option>
              <option>ADESSO</option>
              <option>ADIC</option>
              <option>ADOBE</option>
              <option>ADT</option>
              <option>ADTECH</option>
              <option>ADTRAN</option>
              <option>ADVA OPTICAL</option>
              <option>ADVANSYS</option>
              <option>ADVANTECH</option>
              <option>ADVENT</option>
              <option>AFC</option>
              <option>AGILENT</option>
              <option>AIRPAX</option>
              <option>ALCATEL</option>
              <option>ALERA</option>
              <option>ALIENWARE</option>
              <option>ALLIED</option>
              <option>ALPS</option>
              <option>ALT</option>
              <option>ALTEC</option>
              <option>ALTEON</option>
              <option>ALTERA</option>
              <option>ALTOS</option>
              <option>AMD</option>
              <option>AMETEK INC</option>
              <option>AMINO COMMUNICATIONS</option>
              <option>AMP</option>
              <option>AMPEX</option>
              <option>ANALOGIC</option>
              <option>ANDREW</option>
              <option>ANTEX</option>
              <option>ANYCOM</option>
              <option>AOC</option>
              <option>APC</option>
              <option>APEX</option>
              <option>APOLLO</option>
              <option>APPLE</option>
              <option>APRICORN</option>
              <option>APROTEK</option>
              <option>APS</option>
              <option>ARCHIVE</option>
              <option>ARGUS TECHNOLOGIES</option>
              <option>ARISTA NETWORKS</option>
              <option>ARMADA</option>
              <option>ARNET</option>
              <option>ARRIS</option>
              <option>ARROW</option>
              <option>ARTEC</option>
              <option>ARUBA NETWORKS</option>
              <option>ASANTE</option>
              <option>ASCEND</option>
              <option>ASKEY</option>
              <option>ASPIRE</option>
              <option>ASTEC</option>
              <option>ASUS</option>
              <option>AT&amp;amp;T</option>
              <option>ATALLA</option>
              <option>ATG</option>
              <option>ATI</option>
              <option>ATMEL</option>
              <option>AU OPTRONICS</option>
              <option>AULT</option>
              <option>AVAGO</option>
              <option>AVANTEK</option>
              <option>AVAYA</option>
              <option>AVOCENT</option>
              <option>AVX</option>
              <option>AXIS</option>
              <option>AZTECH</option>
              <option>BASE</option>
              <option>BASON</option>
              <option>BATTERY BIZ</option>
              <option>BAY NETWORKS</option>
              <option>BAYTECH</option>
              <option>BELKIN</option>
              <option>BENQ</option>
              <option>BEST DATA</option>
              <option>BEST POWER</option>
              <option>BIOSTAR</option>
              <option>BLACK BOX</option>
              <option>BLACKBERRY</option>
              <option>BLINE</option>
              <option>BLONDER TONGUE LABORATORY</option>
              <option>BROADCOM</option>
              <option>BROCADE</option>
              <option>BROOKTROUT</option>
              <option>BROTHER</option>
              <option>BUFFALO</option>
              <option>BULL</option>
              <option>BUS LOGIC</option>
              <option>BUSSMAN</option>
              <option>C-TEC</option>
              <option>C.ITOH AMERICA</option>
              <option>CABLE EXCHANGE</option>
              <option>CABLES TO GO</option>
              <option>CABLES UNLIMITED</option>
              <option>CABLETRON</option>
              <option>CALIX</option>
              <option>CANON</option>
              <option>CARLING</option>
              <option>CARRIER ACCESS</option>
              <option>CASCADE</option>
              <option>CASE LOGIC</option>
              <option>CASIO</option>
              <option>CATALYST</option>
              <option>CDTECH</option>
              <option>CELESTICA</option>
              <option>CENTRAL</option>
              <option>CHECKMATE</option>
              <option>CHECKPOINT</option>
              <option>CHEROKEE</option>
              <option>CHIP PC</option>
              <option>CIENA</option>
              <option>CIRRUS LOGIC</option>
              <option>CISCO</option>
              <option>CITIZEN</option>
              <option>CITRIX</option>
              <option>CLEARPOINT</option>
              <option>COBALT</option>
              <option>CODEX</option>
              <option>COMDIAL</option>
              <option>COMMANDO</option>
              <option>COMPAQ</option>
              <option>COMPELLENT</option>
              <option>COMPUFOX</option>
              <option>COMPUTER ASSOCIATES</option>
              <option>CONNER</option>
              <option>CONVERGE</option>
              <option>COOLTRON</option>
              <option>COREL</option>
              <option>CORSAIR</option>
              <option>CRAY</option>
              <option>CREATIVE LABS</option>
              <option>CRUCIAL</option>
              <option>CYBER</option>
              <option>CYBEROAM</option>
              <option>CYPRESS</option>
              <option>D-LINK</option>
              <option>DALE</option>
              <option>DALLAS</option>
              <option>DATA EXPRESS</option>
              <option>DATA GENERAL</option>
              <option>DATACARD GROUP</option>
              <option>DATALOGIC</option>
              <option>DATAMAX</option>
              <option>DATAPRODUCTS</option>
              <option>DATARAM</option>
              <option>DATASOUTH</option>
              <option>DATEL</option>
              <option>DATSOUTH</option>
              <option>DEC</option>
              <option>DECISION DATA</option>
              <option>DELL</option>
              <option>DELTA ELECTRON</option>
              <option>DESCO</option>
              <option>DIALOGIC</option>
              <option>DIEBOLD</option>
              <option>DIGI</option>
              <option>DIGITAL LINK</option>
              <option>DIGITEL</option>
              <option>DSI</option>
              <option>DYMO</option>
              <option>E-MACHINES</option>
              <option>EASTERN RESEARCH</option>
              <option>EDGE</option>
              <option>ELMA</option>
              <option>ELO</option>
              <option>ELPIDA</option>
              <option>EMC</option>
              <option>EMERSON</option>
              <option>EMULEX</option>
              <option>ENGENIUS</option>
              <option>ENTERASYS</option>
              <option>ENVISION</option>
              <option>EPSON</option>
              <option>EQUINOX</option>
              <option>ERICSSON</option>
              <option>EXABYTE</option>
              <option>EXTREME NETWORKS</option>
              <option>EXTRON ELECTRONICS</option>
              <option>F5</option>
              <option>FAI</option>
              <option>FAIRCHILD</option>
              <option>FARGO ELECTRONICS</option>
              <option>FELLOWES</option>
              <option>FIJITSU</option>
              <option>FINISAR</option>
              <option>FLUKE</option>
              <option>FORE SYSTEM</option>
              <option>FORTINET</option>
              <option>FOUNDRY</option>
              <option>FOXCONN</option>
              <option>FSC</option>
              <option>FUJI</option>
              <option>FUJITSU</option>
              <option>FUNAI</option>
              <option>GATEWAY</option>
              <option>GENERAL</option>
              <option>GENERAL DYNAMICS</option>
              <option>GENERAL SEMICONDUCTOR</option>
              <option>GENERIC</option>
              <option>GENICOM</option>
              <option>GIGABYTE</option>
              <option>GIGAMON</option>
              <option>GN NETCOM</option>
              <option>GOLDENRAM</option>
              <option>GOLDSTAR</option>
              <option>GRANDSTREAM NETWORKS</option>
              <option>GREENLEE TEXTRON</option>
              <option>GW INSTEK</option>
              <option>H3C</option>
              <option>HALIPLEX</option>
              <option>HANNA INSTRUMENTS</option>
              <option>HARMONIC</option>
              <option>HARRIS</option>
              <option>HEINEMANN</option>
              <option>HHP</option>
              <option>HIGHPOINT</option>
              <option>HITACHI</option>
              <option>HONEYWELL</option>
              <option>HORIZON</option>
              <option>HP</option>
              <option>HP PROCURVE</option>
              <option>HPE</option>
              <option>HTC</option>
              <option>HUAWEI</option>
              <option>HUBBELL</option>
              <option>HYNIX</option>
              <option>HYPER MICROSYSTEMS</option>
              <option>HYPERCOM</option>
              <option>HYPERTEC</option>
              <option>HYTEK</option>
              <option>HYUNDI</option>
              <option>IBM</option>
              <option>ICC</option>
              <option>IDT</option>
              <option>IMATION</option>
              <option>INFINEON</option>
              <option>INFINERA</option>
              <option>INFOCUS</option>
              <option>INGENICO</option>
              <option>INTEL</option>
              <option>INTELLIGENT</option>
              <option>INTER-TECH</option>
              <option>INTER-TEL</option>
              <option>INTERCONNECT</option>
              <option>INTERMEC</option>
              <option>INTERTEL</option>
              <option>IOGEAR</option>
              <option>IOMEGA</option>
              <option>ITOUCH</option>
              <option>IWATSU</option>
              <option>JABRA</option>
              <option>JET STREAM</option>
              <option>JUNIPER</option>
              <option>JUNIPER NETWORKS</option>
              <option>KASPERSKY LAB</option>
              <option>KEMET</option>
              <option>KENTROX</option>
              <option>KERIO</option>
              <option>KINGSTON</option>
              <option>KOA</option>
              <option>KODAK</option>
              <option>KONICA</option>
              <option>KRONE</option>
              <option>KYOCERA</option>
              <option>LABTEC</option>
              <option>LANTRONIX</option>
              <option>LARSCOM</option>
              <option>LENOVO</option>
              <option>LEXMARK</option>
              <option>LG</option>
              <option>LIEBERT</option>
              <option>LIFESIZE</option>
              <option>LIGHTWAVE</option>
              <option>LINKSYS</option>
              <option>LINUX</option>
              <option>LITE-ON</option>
              <option>LITTELFUSE</option>
              <option>LOGITECH</option>
              <option>LORAIN</option>
              <option>LSI LOGIC</option>
              <option>LUCENT</option>
              <option>LYNKSYS</option>
              <option>MAGNETEK</option>
              <option>MAGTEK</option>
              <option>MANNESMANN TALLY</option>
              <option>MARCONI</option>
              <option>MATSUSHITA</option>
              <option>MAX</option>
              <option>MAXIM</option>
              <option>MAXTOR</option>
              <option>MC DATA</option>
              <option>MELLANOX</option>
              <option>MEMOREX TELEX</option>
              <option>MERAKI</option>
              <option>METROLOGIC</option>
              <option>MICRON</option>
              <option>MICROPOLIS</option>
              <option>MICROS</option>
              <option>MICROSOFT</option>
              <option>MICROTEK</option>
              <option>MIKROTIK</option>
              <option>MILAN</option>
              <option>MINOLTA</option>
              <option>MITEL</option>
              <option>MITSUBISHI</option>
              <option>MITSUSHITA</option>
              <option>MOLEX</option>
              <option>MONSTER CABLE</option>
              <option>MOTOROLA</option>
              <option>MRV</option>
              <option>MSI</option>
              <option>MULTITECH</option>
              <option>MURATA</option>
              <option>MYTEL</option>
              <option>NAT</option>
              <option>NATIONAL SEMICONDUCTOR</option>
              <option>NBASE</option>
              <option>NCR</option>
              <option>NEC</option>
              <option>NET-TO-NET</option>
              <option>NETAPP</option>
              <option>NETGEAR</option>
              <option>NEWBRIDGE</option>
              <option>NIKON</option>
              <option>NIMBLE STORAGE</option>
              <option>NIPPON</option>
              <option>NOKIA</option>
              <option>NORAND</option>
              <option>NORSTAR</option>
              <option>NORTEL</option>
              <option>NOVELL</option>
              <option>NR SYSTEMS</option>
              <option>NRSYSTEMS</option>
              <option>NSC</option>
              <option>NVIDIA</option>
              <option>OCTEL</option>
              <option>OCZ TECHNOLOGY</option>
              <option>OKIDATA</option>
              <option>OLIVETTI</option>
              <option>OLYMPUS</option>
              <option>ONS</option>
              <option>OPZOON</option>
              <option>ORACLE</option>
              <option>ORANGE NETWORKS</option>
              <option>OVERLAND STORAGE</option>
              <option>PACKARD BELL</option>
              <option>PACKETEER</option>
              <option>PALM</option>
              <option>PALO ALTO</option>
              <option>PANASONIC</option>
              <option>PAR</option>
              <option>PARADYNE</option>
              <option>PERLE SYSTEMS</option>
              <option>PHILIP SEMICONDUCTOR</option>
              <option>PHILIPS</option>
              <option>PHILLIPS</option>
              <option>PINNACLE</option>
              <option>PIONEER</option>
              <option>PIVOTSTOR</option>
              <option>PLANAR SYSTEMS</option>
              <option>PLANTRONICS</option>
              <option>PLASMON</option>
              <option>POLYCOM</option>
              <option>POWERWARE</option>
              <option>PRINTRONIX</option>
              <option>PROCERA NETWORKS</option>
              <option>PROXIM</option>
              <option>PSC</option>
              <option>PTX</option>
              <option>PURE STORAGE</option>
              <option>Q-BIT</option>
              <option>QLOGIC</option>
              <option>QMS</option>
              <option>QNC</option>
              <option>QUALCOMM</option>
              <option>QUANTA</option>
              <option>QUANTUM</option>
              <option>QUICK EAGLE NETWORKS</option>
              <option>RackSolutions</option>
              <option>RADIAN</option>
              <option>Radiant Systems</option>
              <option>RADWARE</option>
              <option>REDHAT</option>
              <option>RGB SPECTRUM</option>
              <option>RICOH</option>
              <option>RIVERBED TECHNOLOGY</option>
              <option>RIVERSTONE</option>
              <option>ROHM</option>
              <option>ROLM</option>
              <option>RUCKUS WIRELESS</option>
              <option>SAGEN</option>
              <option>SAM</option>
              <option>SAMSUNG</option>
              <option>SAMTEC</option>
              <option>SAMTRON</option>
              <option>SANYO</option>
              <option>SEAGATE</option>
              <option>SEALEVEL SYSTEMS</option>
              <option>SEC</option>
              <option>SGI</option>
              <option>SHARP</option>
              <option>SIEMENS</option>
              <option>SIG</option>
              <option>SIMPLETECH</option>
              <option>SL POWER</option>
              <option>SNOM TECHNOLOGY</option>
              <option>SONICWALL</option>
              <option>SONY</option>
              <option>SpectraLink</option>
              <option>SPIRENT COMMUNICATIONS</option>
              <option>Startech</option>
              <option>STM</option>
              <option>STORAGETEK</option>
              <option>SUN</option>
              <option>SUPERMICRO</option>
              <option>SYMANTEC</option>
              <option>SYMBOL</option>
              <option>SYMMETRICOM</option>
              <option>SYMTECH</option>
              <option>SYSTEMAX</option>
              <option>Tadiran</option>
              <option>TALLY</option>
              <option>TANBERG DATA</option>
              <option>TANDY</option>
              <option>TARGUS</option>
              <option>TDK-LAMDA</option>
              <option>TEAC</option>
              <option>TEKTRONIX</option>
              <option>TELCO SYSTEMS</option>
              <option>TELECT</option>
              <option>TELEDYNE</option>
              <option>TELEX</option>
              <option>TELLABS</option>
              <option>TELTRONICS</option>
              <option>TELXON</option>
              <option>TEXAS</option>
              <option>THOMAS &amp;amp; BETTS</option>
              <option>TI</option>
              <option>TIE</option>
              <option>TippingPoint</option>
              <option>TLY</option>
              <option>TOSHIBA</option>
              <option>Transition</option>
              <option>TRANSITION NETWORKS</option>
              <option>TRENDNET</option>
              <option>TRIDENT</option>
              <option>TRIMM</option>
              <option>TRIPPLITE</option>
              <option>TROMPETER</option>
              <option>TSC</option>
              <option>TYAN</option>
              <option>TYCO</option>
              <option>TYCON POWER SYSTEMS</option>
              <option>UBIQUITI NETWORKS</option>
              <option>UCS</option>
              <option>UNICOM</option>
              <option>UNIFY</option>
              <option>UNIPAC</option>
              <option>UNIPOWER</option>
              <option>UNISPHERE</option>
              <option>UNISYS</option>
              <option>UNITECH</option>
              <option>UNIVAC</option>
              <option>US POWER</option>
              <option>US ROBOTICS</option>
              <option>VALUERAM</option>
              <option>VECIMA NETWORKS</option>
              <option>VERBATIM</option>
              <option>VERIFONE</option>
              <option>VERILINK</option>
              <option>VERITAS</option>
              <option>VIEWSONIC</option>
              <option>VIKING</option>
              <option>VISHAY</option>
              <option>VISUAL NETWORKS</option>
              <option>VMWARE</option>
              <option>VODAVI</option>
              <option>WANG</option>
              <option>WATCHGUARD</option>
              <option>WD</option>
              <option>WESTELL</option>
              <option>WESTERN DIGITAL</option>
              <option>WIN</option>
              <option>WINTEC</option>
              <option>WYSE</option>
              <option>XEL</option>
              <option>XEROX</option>
              <option>XILINX</option>
              <option>XTREME POWER</option>
              <option>XYPLEX</option>
              <option>YAMAHA</option>
              <option>YEALINK</option>
              <option>ZEBRA TECHNOLOGIES</option>
              <option>ZHONE</option>
              <option>ZILOG</option>
              <option>ZTE</option>
            </select>
          </div>
          <div className={css.buttons}>
            <button
              className={css.orangeButton}
              onClick={(e) => goToTopSearchesWithManufacturer(e, "yesterday")}
            >
              Yesterday
            </button>
            <button
              className={css.orangeButton}
              onClick={(e) => goToTopSearchesWithManufacturer(e, "last_7_days")}
            >
              Last 7 Days
            </button>
            <button
              className={css.orangeButton}
              onClick={(e) => goToTopSearchesWithManufacturer(e, "last_month")}
            >
              Last 30 Days
            </button>
          </div>
        </div>

        {/* Supply And Demand */}
        <div className={css.section}>
          <h3>Supply And Demand</h3>
          <form onSubmit={goToSupplyAndDemand}>
            <div className={css.display}>
              <label htmlFor="partModel">Part Search*</label>
              <input
                type="text"
                name="partModel"
                id="partModel"
                placeholder="Exact Matches Only"
              />
            </div>
            <div className={css.buttons}>
              <button className={css.orangeButton}>Submit</button>
            </div>
          </form>
        </div>

        {/* Quantities */}
        <div className={css.section}>
          <h3>Quantities</h3>
          <div className={css.section_qualities}>
            <span>
              <p>Want To Buy:</p>
              <p>0</p>
            </span>
            <span>
              <p>Want To Sell:</p>
              <p>0</p>
            </span>
            <span>
              <p>Total BrokerBin Items Listed:</p>
              <p>0</p>
            </span>
            <span>
              <p>Total Members Listed:</p>
              <p>0</p>
            </span>
          </div>
        </div>

        {/* View A Company's Inventory */}
        <div className={css.section}>
          <h3>View A Company's Inventory</h3>
          <div className={css.display}>
            <SearchCompanyInventory />
          </div>
        </div>
      </div>
    </div>

</>

  );
};

export default SiteWide;
