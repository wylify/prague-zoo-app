import React from 'react';
import { BeerStop, UserNote } from '../types';
import { Download, FileText, Smartphone, AlertTriangle, CloudRain, ShieldCheck, Map, HelpCircle } from 'lucide-react';

interface OfflineDownloadProps {
  stops: BeerStop[];
  userProgress: UserNote[];
}

export default function OfflineDownload({ stops, userProgress }: OfflineDownloadProps) {
  
  const handleDownloadOfflineGuide = (e: React.MouseEvent) => {
    e.preventDefault();
    
    let textContent = `========================================================================\n`;
    textContent += `     PRAGUE BEER ZOO OFFICIAL TRAVEL GUIDE (OFFLINE EDITION)\n`;
    textContent += `              11 legendary animal-themed Prague taverns\n`;
    textContent += `========================================================================\n\n`;
    textContent += `This offline file acts as your backup guide when you undergo the trail\n`;
    textContent += `without cellular data roaming or active WiFi in historic stone pubs.\n\n`;
    textContent += `------------------------------------------------------------------------\n`;
    textContent += `THE RECOMMENDED core PATH SEQUENCE (4.5 km Walking Trail)\n`;
    textContent += `Hradčany Heights -> Malá Strana -> Staré Město -> Nové Město -> Karlín\n`;
    textContent += `------------------------------------------------------------------------\n\n`;

    stops.forEach((stop, index) => {
      const isExcursion = stop.id === 9;
      const progress = userProgress.find(p => p.stopId === stop.id);
      
      textContent += `[STOP #${stop.id}] ${stop.name.toUpperCase()}\n`;
      textContent += `🇨🇿 Original Name: ${stop.originalName}\n`;
      textContent += `📍 Address Code: ${stop.address}\n`;
      textContent += `ℹ️ Location Lat/Lng: ${stop.latitude.toFixed(6)}, ${stop.longitude.toFixed(6)}\n`;
      textContent += `🕒 Weekend Hours: Saturday: ${stop.hours.saturday} | Sunday: ${stop.hours.sunday}\n`;
      textContent += `💵 Payment Methods: ${stop.payment.toUpperCase()} (Crucial offline tip!)\n`;
      textContent += `🍺 Highlight Beer: ${stop.beers.join(', ')}\n`;
      textContent += `🚩 Crowded Seating difficulty: ${'★'.repeat(stop.difficulty)}${'☆'.repeat(5 - stop.difficulty)} (5=crowded)\n`;
      textContent += `🌍 Direct Directions Link: ${stop.googleMapsUrl}\n`;
      textContent += `📝 Personal Note: ${progress?.notes || 'No note written.'}\n`;
      textContent += `✅ Visited Status: ${progress?.visited ? 'Completed [X]' : 'Not yet visited [ ]'}\n`;
      textContent += `------------------------------------------------------------------------\n\n`;
    });

    textContent += `========================================================================\n`;
    textContent += `                 OFFLINE TRAVEL INSTRUCTIONS & TRICKS\n`;
    textContent += `========================================================================\n`;
    textContent += `- DOWNLOAD MAPS OFFLINE: Before leaving WiFi, open Google Maps on your phone,\n`;
    textContent += `  search "Prague", expand the options menu (three dots / avatar) -> select "Download offline map".\n`;
    textContent += `- CASH WARNING: Pubs 1, 2, 3, and 4 are STRICTLY cash-only. Bring plenty of Czech Koruna (CZK).\n`;
    textContent += `   ATMs near Prague Castle charge high conversion markups. We recommend withdrawing from air bank / Fio Bank ATMs in town.\n`;
    textContent += `- THE 10% CUSTOM: It is customary to tip roughly 10% of your bill. Hand the tip directly to the waiter\n`;
    textContent += `  as you state the final sum you wish to pay. Do not leave money on the tables.\n`;
    textContent += `- FOOD MATES: Traditional dishes like beef goulash, pork knuckle, or pickled cheese (hermelín)\n`;
    textContent += `  provide the absolute base required for this marathon walk.\n`;
    textContent += `========================================================================\n`;

    const element = document.createElement("a");
    const file = new Blob([textContent], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = "prague-beer-zoo-pocket-guide.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div id="offline-section" className="no-print bg-[#FDFCF8] border border-[#1A1A1A] p-6 shadow-xs max-w-4xl mx-auto my-6 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-none">
      
      {/* Offline description column */}
      <div className="md:col-span-2 space-y-3">
        <h4 className="font-serif text-2xl font-black text-editorial-green italic flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-editorial-green" />
          <span>Active Offline Travel Companion</span>
        </h4>
        <p className="text-xs text-[#1A1A1A] leading-relaxed font-sans">
          Historical pubs like <strong>U Hrocha</strong> and <strong>U Černého vola</strong> are located deep in stone basements or castle vaults where cellular connections completely fail. Use our download tools to secure your tour without cellular roaming.
        </p>
        
      </div>

      {/* Action panel column */}
      <div className="bg-[#F2EFE9] border border-[#E8E4D9] p-4 flex flex-col justify-between space-y-4 rounded-none">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-stone-500 uppercase block font-bold">Offline Backups</span>
          <h5 className="font-serif text-sm font-black text-[#2D3A27] italic">Get Pocket Text Guide</h5>
          <p className="text-[11px] text-stone-600 font-serif">
            Export all 11 stops details + directions coordinate links into zero-byte text files readable anywhere offline.
          </p>
        </div>

        <button
          id="dl-guide-btn"
          onClick={handleDownloadOfflineGuide}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#2D3A27] text-white font-mono font-bold tracking-wider text-[11px] rounded-none transition cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>DOWNLOAD GUIDE (TXT)</span>
        </button>
      </div>

    </div>
  );
}
