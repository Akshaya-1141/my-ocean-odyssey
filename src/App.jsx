import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Anchor, ArrowDown, Fish, Radar, Shield, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainContainer = useRef();
  const waveCanvasRef = useRef(null);
  const depthRef = useRef(0);
  const activeTabRef = useRef('overview');
  const [depth, setDepth] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeDetail, setActiveDetail] = useState(null);

  const tabItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'zones', label: 'Zones' },
    { id: 'systems', label: 'Systems' },
    { id: 'records', label: 'Records' },
    { id: 'abyss', label: 'Abyss' },
  ];

  const zones = [
    {
      title: 'Surface Zone',
      depth: '0m - 200m',
      description: 'Sunlit waters with high visibility, plankton blooms, and active predator routes.',
      image: '/ocean/surface.svg',
      facts: ['Light: 90-100%', 'Temp: 18C-30C', 'Pressure: 1-20 atm', 'Visibility: 25m+'],
      details:
        'This is the operational launch band. Drones calibrate optical sensors here before descending into low-light conditions.',
      highlights: [
        'High plankton density supports dense food-web activity.',
        'Primary camera systems are calibrated for color-correct capture.',
        'Baseline current maps are generated for descent planning.',
      ],
      insights: [
        {
          title: 'Ecology Snapshot',
          text: 'Fast-moving shoals and apex predators overlap in this region, making it ideal for tracking migration starts.',
        },
        {
          title: 'Mission Strategy',
          text: 'Crew validates all optical sensors and confirms telemetry lock before crossing below 200m.',
        },
      ],
      checklist: ['Calibrate optics', 'Sync navigation buoys', 'Lock descent corridor'],
    },
    {
      title: 'Twilight Zone',
      depth: '200m - 1000m',
      description: 'Fading light, migrating shoals, and first signs of bioluminescent behavior.',
      image: '/ocean/twilight.svg',
      facts: ['Light: < 1%', 'Temp: 4C-12C', 'Pressure: 20-100 atm', 'Visibility: 8m-15m'],
      details:
        'Schools migrate vertically through this band at dusk. Sonar and pulse-pattern classifiers are primary tracking tools.',
      highlights: [
        'Bioluminescent signaling frequency rises near thermoclines.',
        'Acoustic mapping outperforms visual tracking in this zone.',
        'Energy budget shifts to mixed optical and sonar operations.',
      ],
      insights: [
        {
          title: 'Behavior Shift',
          text: 'Predator-prey interactions become pulse-driven, with burst movement in narrow vertical corridors.',
        },
        {
          title: 'Sampling Window',
          text: 'Best capture interval occurs around local dusk transition when migration lanes are most stable.',
        },
      ],
      checklist: ['Enable pulse classifier', 'Reduce floodlight intensity', 'Activate drift correction'],
    },
    {
      title: 'Midnight Zone',
      depth: '1000m - 4000m',
      description: 'No sunlight reaches here. Communication is pulse-based and pressure is extreme.',
      image: '/ocean/midnight.svg',
      facts: ['Light: 0%', 'Temp: 2C-4C', 'Pressure: 100-400 atm', 'Visibility: < 5m'],
      details:
        'The vessel switches to low-energy scan mode to reduce visual noise and preserve battery during long-duration mapping.',
      highlights: [
        'Bioluminescent species use short pulse sequences for signaling.',
        'Hull stress increases steadily with depth and microcurrent shifts.',
        'Mission cadence slows to preserve thermal and power margins.',
      ],
      insights: [
        {
          title: 'Signal Discipline',
          text: 'Short active-sonar bursts minimize interference while retaining enough data for contour reconstruction.',
        },
        {
          title: 'Safety Envelope',
          text: 'Crew follows narrow ascent and descent windows to avoid turbulence pockets around trench walls.',
        },
      ],
      checklist: ['Enter low-power profile', 'Monitor hull mesh alerts', 'Confirm emergency ascent path'],
    },
  ];

  const missionSystems = [
    {
      title: 'Acoustic Radar',
      icon: Radar,
      summary: 'Maps terrain edges and life signatures in low-visibility sectors.',
      metric: 'Scan Radius: 4.2 km',
      detail:
        'Multi-band pings build a terrain contour in real time. Adaptive filtering removes thermal plume interference.',
      facts: ['Range: 4.2 km', 'Refresh: 2.8s', 'Bands: 5'],
      highlights: [
        'Detects steep wall gradients before visual systems can resolve them.',
        'Marks biologic motion clusters separate from rock reflection noise.',
        'Maintains stable tracking even during low-frequency plume turbulence.',
      ],
      insights: [
        {
          title: 'Core Components',
          text: 'Tri-array emitters, adaptive filters, and terrain fusion engine operating in synchronized ping windows.',
        },
        {
          title: 'Safety Value',
          text: 'Provides early warning for narrow passages and allows pre-emptive micro-adjustments to heading.',
        },
      ],
      checklist: ['Ping calibration', 'Noise floor baseline', 'Terrain lock confirmation'],
    },
    {
      title: 'Species Tracker',
      icon: Fish,
      summary: 'Detects migration pathways by combining pulse patterns and depth windows.',
      metric: 'Tracked Species: 28',
      detail:
        'Classification models score movement signatures every 12 seconds and mark high-confidence routes for crew review.',
      facts: ['Tracked: 28', 'Model Confidence: 93%', 'Update Window: 12s'],
      highlights: [
        'Builds migration heatmaps from repeated movement signatures.',
        'Flags anomalous behavior patterns near hydrothermal zones.',
        'Links depth, pulse rhythm, and path velocity for classification.',
      ],
      insights: [
        {
          title: 'Data Sources',
          text: 'Acoustic traces, low-light optical snippets, and pressure-linked movement vectors.',
        },
        {
          title: 'Operator Benefit',
          text: 'Crew can prioritize biologically rich sectors for sample collection with reduced drift time.',
        },
      ],
      checklist: ['Sync species model', 'Enable anomaly alerts', 'Tag sampling sectors'],
    },
    {
      title: 'Hull Integrity',
      icon: Shield,
      summary: 'Real-time stress feedback to maintain safe descent and ascent paths.',
      metric: 'Stress Margin: 92%',
      detail:
        'Sensor mesh predicts stress concentration and proposes micro-adjustments to ballast for safer trench operations.',
      facts: ['Stress Margin: 92%', 'Sensors: 840', 'Latency: 0.9s'],
      highlights: [
        'Continuously maps stress across frame and viewport joints.',
        'Predicts load concentration ahead of rapid pressure transitions.',
        'Triggers adaptive ballast suggestions during trench maneuvering.',
      ],
      insights: [
        {
          title: 'Monitoring Stack',
          text: 'Distributed strain sensors, thermal monitors, and pressure compensator telemetry in a single console view.',
        },
        {
          title: 'Risk Reduction',
          text: 'Early load warnings significantly reduce risk during prolonged missions below 8000m.',
        },
      ],
      checklist: ['Run stress sweep', 'Verify seal telemetry', 'Confirm ascent fallback'],
    },
  ];

  const missionPanels = [
    {
      title: 'Hydrothermal Vent Survey',
      copy: 'Thermal plume mapping identified three active vent fields sustaining chemosynthetic life.',
      image: '/ocean/vent.svg',
      findings: ['3 active vent clusters', 'Peak plume: 322C', '2 new microbial samples'],
      facts: ['Mission Time: 03h 42m', 'ROV Deployments: 4', 'Core Samples: 11'],
      highlights: [
        'Mapped plume geometry across three neighboring vent chimneys.',
        'Captured high-resolution mineral deposition imagery.',
        'Detected dense microbial mats around thermal boundaries.',
      ],
      insights: [
        {
          title: 'Scientific Value',
          text: 'Findings support active chemosynthesis zones with stable nutrient gradients despite high thermal variance.',
        },
        {
          title: 'Operational Note',
          text: 'Best imaging quality occurred during low-current windows under 0.4 knots.',
        },
      ],
      checklist: ['Tag vent coordinates', 'Archive thermal mesh', 'Schedule return survey'],
    },
    {
      title: 'Hadal Trench Descent',
      copy: 'A pressure-safe path was charted to 10,500m with low-turbulence windows for sampling.',
      image: '/ocean/trench.svg',
      findings: ['Depth reached: 10,500m', 'Window stability: 17 min', 'Seafloor cores: 6'],
      facts: ['Mission Time: 05h 18m', 'Max Pressure: 1080 atm', 'Drift Error: 1.7%'],
      highlights: [
        'Completed full-depth transit within stress-safe thresholds.',
        'Recovered intact sediment cores from hadal floor shelf.',
        'Established repeatable ascent path under dynamic current load.',
      ],
      insights: [
        {
          title: 'Navigation Outcome',
          text: 'Combined sonar contouring and drift correction reduced wall-proximity risk in narrow trench corridors.',
        },
        {
          title: 'Next Expedition Focus',
          text: 'Planned return mission targets lateral transects to expand biological sampling coverage.',
        },
      ],
      checklist: ['Validate trench map', 'Cross-check stress logs', 'Publish descent protocol'],
    },
  ];

  const openDetail = (kind, item) => {
    setActiveDetail({ kind, item });
  };

  useEffect(() => {
    depthRef.current = depth;
  }, [depth]);

  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId = 0;
    let phase = 0;
    let lastTime = performance.now();
    const pulses = [];
    const entities = [];
    let activeProfileKey = 'surface';

    const zoneProfiles = {
      surface: {
        waveAmp: 1.1,
        waveSpeed: 1.08,
        waveIntensity: 1,
        waveBand: [0.16, 0.24],
        waveAlpha: 1,
        tint: 'rgba(186, 230, 253, 0.08)',
        counts: {
          ship: 2,
          submarine: 1,
          surfer: 2,
          fish: 7,
          turtle: 2,
          jelly: 1,
          whale: 1,
          squid: 0,
          angler: 0,
          coral: 3,
          vent: 0,
        },
        ranges: {
          ship: [0.08, 0.2],
          submarine: [0.2, 0.35],
          surfer: [0.1, 0.24],
          fish: [0.28, 0.7],
          turtle: [0.35, 0.78],
          jelly: [0.4, 0.82],
          whale: [0.48, 0.84],
          squid: [0.58, 0.86],
          angler: [0.64, 0.9],
          coral: [0.82, 0.95],
          vent: [0.9, 0.98],
        },
      },
      twilight: {
        waveAmp: 0.95,
        waveSpeed: 0.95,
        waveIntensity: 0.24,
        waveBand: [0.34, 0.42],
        waveAlpha: 0.9,
        tint: 'rgba(59, 130, 246, 0.12)',
        counts: {
          ship: 0,
          submarine: 2,
          surfer: 0,
          fish: 6,
          turtle: 1,
          jelly: 4,
          whale: 1,
          squid: 2,
          angler: 1,
          coral: 0,
          vent: 0,
        },
        ranges: {
          ship: [0.1, 0.17],
          submarine: [0.27, 0.42],
          surfer: [0.12, 0.22],
          fish: [0.35, 0.78],
          turtle: [0.46, 0.84],
          jelly: [0.42, 0.86],
          whale: [0.55, 0.9],
          squid: [0.56, 0.9],
          angler: [0.64, 0.93],
          coral: [0.88, 0.96],
          vent: [0.9, 0.98],
        },
      },
      midnight: {
        waveAmp: 0.75,
        waveSpeed: 0.84,
        waveIntensity: 0.04,
        waveBand: [0.62, 0.72],
        waveAlpha: 0.8,
        tint: 'rgba(15, 23, 42, 0.2)',
        counts: {
          ship: 0,
          submarine: 1,
          surfer: 0,
          fish: 4,
          turtle: 0,
          jelly: 4,
          whale: 1,
          squid: 3,
          angler: 2,
          coral: 0,
          vent: 2,
        },
        ranges: {
          ship: [0.08, 0.14],
          submarine: [0.32, 0.5],
          surfer: [0.12, 0.22],
          fish: [0.48, 0.88],
          turtle: [0.6, 0.93],
          jelly: [0.5, 0.94],
          whale: [0.68, 0.96],
          squid: [0.62, 0.94],
          angler: [0.72, 0.97],
          coral: [0.9, 0.98],
          vent: [0.9, 0.985],
        },
      },
      abyss: {
        waveAmp: 0.62,
        waveSpeed: 0.78,
        waveIntensity: 0.02,
        waveBand: [0.8, 0.92],
        waveAlpha: 0.68,
        tint: 'rgba(2, 6, 23, 0.3)',
        counts: {
          ship: 0,
          submarine: 1,
          surfer: 0,
          fish: 2,
          turtle: 0,
          jelly: 2,
          whale: 1,
          squid: 2,
          angler: 2,
          coral: 0,
          vent: 3,
        },
        ranges: {
          ship: [0.08, 0.12],
          submarine: [0.45, 0.62],
          surfer: [0.12, 0.22],
          fish: [0.62, 0.94],
          turtle: [0.72, 0.96],
          jelly: [0.68, 0.97],
          whale: [0.78, 0.98],
          squid: [0.76, 0.98],
          angler: [0.8, 0.99],
          coral: [0.9, 0.99],
          vent: [0.92, 0.99],
        },
      },
    };

    const waveLayers = [
      { offset: -0.08, amp: 22, freq: 0.010, speed: 0.55, driftSpeed: 0.33, color: 'rgba(103, 232, 249, 0.26)', lineWidth: 1.4 },
      { offset: -0.02, amp: 26, freq: 0.012, speed: 0.68, driftSpeed: 0.28, color: 'rgba(125, 211, 252, 0.20)', lineWidth: 1.2 },
      { offset: 0.04, amp: 18, freq: 0.015, speed: 0.83, driftSpeed: 0.24, color: 'rgba(56, 189, 248, 0.22)', lineWidth: 1.1 },
      { offset: 0.10, amp: 12, freq: 0.019, speed: 1.02, driftSpeed: 0.21, color: 'rgba(14, 165, 233, 0.18)', lineWidth: 1 },
    ];

    const getProfileKeyByDepth = (currentDepth) => {
      if (currentDepth < 200) {
        return 'surface';
      }
      if (currentDepth < 1000) {
        return 'twilight';
      }
      if (currentDepth < 4000) {
        return 'midnight';
      }
      return 'abyss';
    };

    const getProfileKeyBySection = (tabId) => {
      if (tabId === 'overview' || tabId === 'zones') {
        return 'surface';
      }
      if (tabId === 'systems' || tabId === 'records') {
        return 'twilight';
      }
      if (tabId === 'abyss') {
        return 'midnight';
      }
      return null;
    };

    const rand = (min, max) => min + Math.random() * (max - min);
    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
    const lerp = (start, end, t) => start + (end - start) * t;
    const getPulseBoostAt = (x, y, boostScale = 1) => {
      let boost = 0;
      for (const pulse of pulses) {
        const dx = x - pulse.x;
        const dy = y - pulse.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = pulse.radius * pulse.radius;
        boost += Math.exp(-distSq / (2 * radiusSq)) * pulse.strength * boostScale;
      }
      return boost;
    };

    const getWaveCenter = (profile, currentDepth, currentPhase) => {
      const depthProgress = clamp(currentDepth / 11000, 0, 1);
      const [bandMin, bandMax] = profile.waveBand || [0.2, 0.4];
      const depthShift = lerp(bandMin, bandMax, depthProgress);
      const phaseDrift = Math.sin(currentPhase * 0.22) * 0.012;
      return depthShift + phaseDrift;
    };

    const createEntity = (type, profileKey) => {
      const movingRight = Math.random() > 0.5;
      const profile = zoneProfiles[profileKey] || zoneProfiles.surface;

      const configs = {
        ship: {
          size: rand(1.7, 2.2),
          speed: rand(0.28, 0.45),
          color: 'rgba(224, 242, 254, 0.62)',
        },
        submarine: {
          size: rand(1.45, 1.95),
          speed: rand(0.25, 0.42),
          color: 'rgba(191, 219, 254, 0.56)',
        },
        surfer: {
          size: rand(1.2, 1.56),
          speed: rand(0.35, 0.58),
          color: 'rgba(244, 244, 245, 0.72)',
        },
        fish: {
          size: rand(0.95, 1.22),
          speed: rand(0.4, 0.85),
          color: 'rgba(125, 211, 252, 0.52)',
        },
        turtle: {
          size: rand(1.3, 1.8),
          speed: rand(0.22, 0.42),
          color: 'rgba(148, 163, 184, 0.48)',
        },
        jelly: {
          size: rand(1.05, 1.45),
          speed: rand(0.2, 0.35),
          color: 'rgba(103, 232, 249, 0.48)',
        },
        whale: {
          size: rand(1.85, 2.35),
          speed: rand(0.24, 0.38),
          color: 'rgba(148, 163, 184, 0.42)',
        },
        squid: {
          size: rand(1.18, 1.62),
          speed: rand(0.28, 0.46),
          color: 'rgba(129, 140, 248, 0.48)',
        },
        angler: {
          size: rand(1.12, 1.55),
          speed: rand(0.2, 0.34),
          color: 'rgba(56, 189, 248, 0.48)',
        },
        coral: {
          size: rand(1.55, 2.2),
          speed: 0,
          color: 'rgba(251, 146, 60, 0.5)',
          anchored: true,
          wobbleAmp: rand(0.3, 1.4),
        },
        vent: {
          size: rand(1.45, 2.05),
          speed: 0,
          color: 'rgba(148, 163, 184, 0.5)',
          anchored: true,
          wobbleAmp: rand(0.2, 1.2),
        },
      };

      const cfg = configs[type];
      const [minFrac, maxFrac] = profile.ranges[type] || [0.3, 0.8];
      const minY = height * minFrac;
      const maxY = height * maxFrac;
      const y = rand(minY, maxY);
      const x = rand(0, width);

      return {
        type,
        size: cfg.size,
        x,
        y,
        baseY: y,
        minY,
        maxY,
        vx: (movingRight ? 1 : -1) * cfg.speed,
        vy: rand(-0.12, 0.12),
        color: cfg.color,
        anchored: Boolean(cfg.anchored),
        seed: rand(0, Math.PI * 2),
        wobbleSpeed: rand(0.4, 1.25),
        wobbleAmp: cfg.wobbleAmp ?? rand(3, 16),
        turnTimer: rand(120, 320),
      };
    };

    const populateEntities = (profileKey) => {
      entities.length = 0;

      const profile = zoneProfiles[profileKey] || zoneProfiles.surface;
      const scale = Math.max(0.55, Math.min(1, width / 1600));
      const staticPositions = [];
      const staticSpacingByType = {
        coral: Math.max(160, width * 0.12),
        vent: Math.max(180, width * 0.14),
      };

      Object.entries(profile.counts).forEach(([type, baseCount]) => {
        const count = Math.max(0, Math.round(baseCount * scale));
        for (let i = 0; i < count; i += 1) {
          if (type === 'coral' || type === 'vent') {
            const minDistance = staticSpacingByType[type];
            let placed = null;

            for (let attempt = 0; attempt < 24; attempt += 1) {
              const candidate = createEntity(type, profileKey);
              const hasSpace = staticPositions.every((spot) => {
                const dx = candidate.x - spot.x;
                const dy = candidate.y - spot.y;
                return dx * dx + dy * dy >= minDistance * minDistance;
              });

              if (hasSpace) {
                placed = candidate;
                break;
              }
            }

            if (!placed) {
              placed = createEntity(type, profileKey);
            }

            staticPositions.push({ x: placed.x, y: placed.y });
            entities.push(placed);
          } else {
            entities.push(createEntity(type, profileKey));
          }
        }
      });
    };

    const drawEntity = (entity) => {
      const direction = entity.vx >= 0 ? 1 : -1;
      ctx.save();
      ctx.translate(entity.x, entity.y);
      ctx.scale(direction * entity.size, entity.size);
      ctx.strokeStyle = 'rgba(2, 6, 23, 0.55)';
      ctx.lineWidth = 1.35;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(2, 6, 23, 0.25)';
      ctx.shadowBlur = 7;

      if (entity.type === 'ship') {
        const hullGrad = ctx.createLinearGradient(-28, -2, 26, 14);
        hullGrad.addColorStop(0, 'rgba(247, 250, 252, 0.98)');
        hullGrad.addColorStop(1, 'rgba(194, 206, 221, 0.96)');
        ctx.fillStyle = hullGrad;
        ctx.beginPath();
        ctx.moveTo(-28, 4);
        ctx.quadraticCurveTo(-22, 12, -10, 13);
        ctx.lineTo(14, 13);
        ctx.quadraticCurveTo(23, 11, 26, 4);
        ctx.quadraticCurveTo(18, -4, 10, -4);
        ctx.lineTo(-13, -4);
        ctx.quadraticCurveTo(-22, -4, -28, 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        const deckGrad = ctx.createLinearGradient(-14, -12, 10, -1);
        deckGrad.addColorStop(0, 'rgba(234, 240, 248, 0.97)');
        deckGrad.addColorStop(1, 'rgba(206, 217, 230, 0.93)');
        ctx.fillStyle = deckGrad;
        ctx.beginPath();
        ctx.moveTo(-14, -3);
        ctx.lineTo(6, -3);
        ctx.lineTo(4, -11);
        ctx.lineTo(-10, -11);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(123, 146, 170, 0.9)';
        ctx.fillRect(-1.2, -18, 2.4, 14);
        ctx.strokeStyle = 'rgba(2, 6, 23, 0.35)';
        ctx.beginPath();
        ctx.moveTo(1, -16);
        ctx.lineTo(9, -10);
        ctx.lineTo(1, -10);
        ctx.closePath();
        ctx.fillStyle = 'rgba(244, 246, 248, 0.9)';
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = 'rgba(2, 6, 23, 0.55)';
      }

      if (entity.type === 'submarine') {
        const bodyGrad = ctx.createLinearGradient(-20, 0, 20, 0);
        bodyGrad.addColorStop(0, 'rgba(99, 194, 251, 0.98)');
        bodyGrad.addColorStop(1, 'rgba(29, 139, 214, 0.96)');
        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, 22, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(187, 232, 255, 0.95)';
        ctx.beginPath();
        ctx.ellipse(8, -8, 5.5, 4.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = 'rgba(30, 58, 110, 0.82)';
        ctx.beginPath();
        ctx.arc(8, -8, 1.9, 0, Math.PI * 2);
        ctx.fill();
      }

      if (entity.type === 'surfer') {
        const boardGrad = ctx.createLinearGradient(-18, 0, 18, 0);
        boardGrad.addColorStop(0, 'rgba(230, 250, 255, 0.96)');
        boardGrad.addColorStop(1, 'rgba(120, 220, 255, 0.9)');
        ctx.fillStyle = boardGrad;
        ctx.beginPath();
        ctx.moveTo(-18, 9);
        ctx.quadraticCurveTo(-8, 6, 0, 7);
        ctx.quadraticCurveTo(12, 8, 18, 9);
        ctx.quadraticCurveTo(12, 13, 0, 13);
        ctx.quadraticCurveTo(-10, 13, -18, 9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(248, 180, 142, 0.98)';
        ctx.beginPath();
        ctx.arc(0, -3.8, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(-0.7, -1.3, 1.4, 5.2);
        ctx.fillRect(-3, 2.4, 1.7, 2.1);
        ctx.fillRect(1.3, 2.4, 1.7, 2.1);
      }

      if (entity.type === 'fish') {
        const fishGrad = ctx.createLinearGradient(-14, -3, 13, 6);
        fishGrad.addColorStop(0, 'rgba(44, 153, 224, 0.96)');
        fishGrad.addColorStop(0.6, 'rgba(74, 197, 248, 0.95)');
        fishGrad.addColorStop(1, 'rgba(148, 232, 255, 0.95)');
        ctx.fillStyle = fishGrad;
        ctx.beginPath();
        ctx.moveTo(13, 0);
        ctx.quadraticCurveTo(7, -7, -3, -8);
        ctx.quadraticCurveTo(-10, -7, -14, -2.5);
        ctx.lineTo(-18, -7);
        ctx.lineTo(-18, 7);
        ctx.lineTo(-14, 2.5);
        ctx.quadraticCurveTo(-10, 7, -3, 8);
        ctx.quadraticCurveTo(7, 7, 13, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(219, 246, 255, 0.72)';
        ctx.beginPath();
        ctx.moveTo(-2, -1);
        ctx.quadraticCurveTo(2, -2.6, 7, -1);
        ctx.quadraticCurveTo(2, 0.7, -2, -1);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgba(240, 250, 255, 0.95)';
        ctx.beginPath();
        ctx.arc(8.5, -2, 1.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
        ctx.beginPath();
        ctx.arc(8.6, -2, 0.55, 0, Math.PI * 2);
        ctx.fill();
      }

      if (entity.type === 'turtle') {
        const limbSwing = Math.sin(phase * 3 + entity.seed) * 1.7;
        const shellGrad = ctx.createLinearGradient(-16, -9, 16, 10);
        shellGrad.addColorStop(0, 'rgba(86, 169, 108, 0.96)');
        shellGrad.addColorStop(1, 'rgba(48, 126, 71, 0.94)');
        ctx.fillStyle = shellGrad;
        ctx.beginPath();
        ctx.moveTo(-15, 0);
        ctx.quadraticCurveTo(-10, -10, 2, -9);
        ctx.quadraticCurveTo(12, -8, 16, 0);
        ctx.quadraticCurveTo(12, 8, 2, 9);
        ctx.quadraticCurveTo(-10, 10, -15, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(30, 94, 53, 0.78)';
        const sideShellPattern = [
          [-8, -3], [-3, -4], [2, -3], [7, -2],
          [-8, 1], [-3, 0], [2, 1], [7, 2],
          [-7, 4], [-2, 4], [3, 5],
        ];
        for (const [x, y] of sideShellPattern) {
          ctx.beginPath();
          ctx.arc(x, y, 1.7, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = 'rgba(128, 224, 152, 0.94)';
        ctx.beginPath();
        ctx.ellipse(19, 0, 4.3, 3.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(98, 193, 125, 0.94)';
        ctx.save();
        ctx.translate(-7, -8);
        ctx.rotate((-0.42 + limbSwing * 0.12));
        ctx.beginPath();
        ctx.ellipse(0, 0, 5.4, 2.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.translate(5, -9);
        ctx.rotate((-0.22 + limbSwing * 0.08));
        ctx.beginPath();
        ctx.ellipse(0, 0, 6, 2.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.translate(-7, 8);
        ctx.rotate((0.42 - limbSwing * 0.12));
        ctx.beginPath();
        ctx.ellipse(0, 0, 5.4, 2.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.translate(5, 9);
        ctx.rotate((0.22 - limbSwing * 0.08));
        ctx.beginPath();
        ctx.ellipse(0, 0, 6, 2.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(-16, 0);
        ctx.quadraticCurveTo(-21, -3, -24, 0);
        ctx.quadraticCurveTo(-21, 3, -16, 0);
        ctx.closePath();
        ctx.fill();
      }

      if (entity.type === 'jelly') {
        const bellGrad = ctx.createLinearGradient(0, -12, 0, 6);
        bellGrad.addColorStop(0, 'rgba(214, 255, 242, 0.8)');
        bellGrad.addColorStop(1, 'rgba(144, 232, 209, 0.66)');
        ctx.fillStyle = bellGrad;
        ctx.beginPath();
        ctx.arc(0, -2, 11, Math.PI, 0);
        ctx.lineTo(11, 5);
        ctx.lineTo(-11, 5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = 'rgba(201, 255, 236, 0.88)';
        for (let i = -8; i <= 8; i += 4) {
          ctx.beginPath();
          ctx.moveTo(i, 5);
          const sway = Math.sin(phase * 2 + entity.seed + i) * 1.4;
          ctx.bezierCurveTo(i + sway * 0.4, 9, i + sway, 12, i + sway * 0.8, 17);
          ctx.stroke();
        }
      }

      if (entity.type === 'whale') {
        const whaleGrad = ctx.createLinearGradient(-30, -6, 20, 8);
        whaleGrad.addColorStop(0, 'rgba(90, 110, 140, 0.98)');
        whaleGrad.addColorStop(1, 'rgba(130, 152, 184, 0.94)');
        ctx.fillStyle = whaleGrad;
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.quadraticCurveTo(23, -7, 17, -12);
        ctx.quadraticCurveTo(2, -15, -18, -9);
        ctx.quadraticCurveTo(-30, -2, -28, 2);
        ctx.quadraticCurveTo(-26, 9, -17, 11);
        ctx.quadraticCurveTo(0, 14, 17, 11);
        ctx.quadraticCurveTo(23, 7, 20, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = 'rgba(160, 177, 205, 0.6)';
        ctx.beginPath();
        ctx.moveTo(2, -7);
        ctx.lineTo(7, -15);
        ctx.lineTo(11, -6);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-27, 2);
        ctx.lineTo(-38, -8);
        ctx.lineTo(-34, 1);
        ctx.lineTo(-38, 10);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      if (entity.type === 'squid') {
        const squidGrad = ctx.createLinearGradient(0, -16, 0, 10);
        squidGrad.addColorStop(0, 'rgba(210, 220, 255, 0.95)');
        squidGrad.addColorStop(1, 'rgba(146, 165, 246, 0.9)');
        ctx.fillStyle = squidGrad;
        ctx.beginPath();
        ctx.ellipse(0, -3, 10, 13, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = 'rgba(226, 236, 255, 0.9)';
        for (let i = -8; i <= 8; i += 3) {
          ctx.beginPath();
          ctx.moveTo(i, 9);
          const bend = Math.sin(phase * 2.4 + entity.seed + i) * 2.2;
          ctx.bezierCurveTo(i + bend * 0.5, 12, i + bend * 0.8, 15, i + bend, 21);
          ctx.stroke();
        }
      }

      if (entity.type === 'angler') {
        const anglerGrad = ctx.createLinearGradient(-12, 0, 12, 0);
        anglerGrad.addColorStop(0, 'rgba(14, 129, 179, 0.96)');
        anglerGrad.addColorStop(1, 'rgba(66, 195, 236, 0.92)');
        ctx.fillStyle = anglerGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, 12, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-10, -1);
        ctx.lineTo(-18, -6);
        ctx.lineTo(-18, 6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(5, -5);
        ctx.quadraticCurveTo(11, -13, 14, -10);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255, 230, 120, 0.9)';
        ctx.beginPath();
        ctx.arc(14, -10, 1.8 + Math.sin(phase * 3 + entity.seed) * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      if (entity.type === 'coral') {
        const coralStems = [
          { x: -10, top: -9, w: 3.6, color: 'rgba(239, 101, 56, 0.95)' },
          { x: -3, top: -13, w: 4, color: 'rgba(255, 146, 90, 0.94)' },
          { x: 5, top: -11, w: 3.5, color: 'rgba(255, 188, 110, 0.92)' },
          { x: 12, top: -8, w: 3.2, color: 'rgba(236, 128, 169, 0.93)' },
        ];

        for (const stem of coralStems) {
          ctx.fillStyle = stem.color;
          ctx.beginPath();
          ctx.moveTo(stem.x - stem.w, 16);
          ctx.bezierCurveTo(stem.x - stem.w * 1.1, 8, stem.x - stem.w * 0.5, 0, stem.x, stem.top);
          ctx.bezierCurveTo(stem.x + stem.w * 0.5, 0, stem.x + stem.w * 1.1, 8, stem.x + stem.w, 16);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(stem.x - 1.4, stem.top + 1.6, 2.2, 1.7, -0.5, 0, Math.PI * 2);
          ctx.ellipse(stem.x + 1.8, stem.top + 2.2, 2.3, 1.8, 0.45, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }

      if (entity.type === 'vent') {
        const ventGrad = ctx.createLinearGradient(-8, -11, 8, 16);
        ventGrad.addColorStop(0, 'rgba(186, 198, 215, 0.96)');
        ventGrad.addColorStop(1, 'rgba(118, 136, 158, 0.94)');
        ctx.fillStyle = ventGrad;
        ctx.beginPath();
        ctx.moveTo(-10, 15);
        ctx.lineTo(-6, -11);
        ctx.lineTo(6, -11);
        ctx.lineTo(10, 15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        const plume = Math.sin(phase * 1.6 + entity.seed) * 2;
        ctx.strokeStyle = 'rgba(255, 204, 108, 0.66)';
        for (let i = -5; i <= 5; i += 5) {
          ctx.beginPath();
          ctx.moveTo(i, -10);
          ctx.bezierCurveTo(i + plume * 0.4, -15, i + plume, -22, i + plume * 0.6, -29);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const drawBeachWaveBands = (profile) => {
      const foamColor = 'rgba(255, 255, 255, 0.78)';
      const bodyLayers = [
        { amp: 28, freq: 0.014, speed: 0.82, y: 0.13, color: 'rgba(82, 210, 255, 0.30)' },
        { amp: 24, freq: 0.016, speed: 0.97, y: 0.17, color: 'rgba(47, 187, 240, 0.29)' },
        { amp: 20, freq: 0.018, speed: 1.14, y: 0.21, color: 'rgba(15, 162, 224, 0.27)' },
        { amp: 17, freq: 0.021, speed: 1.29, y: 0.25, color: 'rgba(9, 141, 201, 0.24)' },
        { amp: 14, freq: 0.024, speed: 1.45, y: 0.3, color: 'rgba(12, 128, 184, 0.22)' },
      ];

      for (const layer of bodyLayers) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const waveProbeY = height * layer.y;
          const localBoost = getPulseBoostAt(x, waveProbeY, 1.15);
          const localPhase = phase * layer.speed * profile.waveSpeed * (1 + localBoost * 2.4);
          const y =
            height * layer.y +
            Math.sin(x * layer.freq + localPhase) * layer.amp * profile.waveAmp * (1 + localBoost * 0.55) +
            Math.sin(x * layer.freq * 0.52 + localPhase * 1.35) * layer.amp * 0.22 * profile.waveAmp;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.lineTo(width, 0);
        ctx.lineTo(0, 0);
        ctx.closePath();
        ctx.fillStyle = layer.color;
        ctx.fill();
      }

      const crestLines = [
        { y: 0.165, amp: 12, freq: 0.018, speed: 1.03, alpha: 0.92, width: 2.8 },
        { y: 0.215, amp: 9, freq: 0.021, speed: 1.24, alpha: 0.68, width: 2 },
        { y: 0.265, amp: 7, freq: 0.025, speed: 1.42, alpha: 0.48, width: 1.6 },
      ];

      for (const crest of crestLines) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 6) {
          const crestProbeY = height * crest.y;
          const localBoost = getPulseBoostAt(x, crestProbeY, 1.2);
          const localPhase = phase * crest.speed * (1 + localBoost * 2.2);
          const y =
            height * crest.y +
            Math.sin(x * crest.freq + localPhase) * crest.amp * (1 + localBoost * 0.45) +
            Math.sin(x * crest.freq * 1.8 + localPhase * 1.1) * 1.8;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${crest.alpha})`;
        ctx.lineWidth = crest.width;
        ctx.stroke();
      }

      // Fine sparkle texture for sunlit, realistic surface detail.
      ctx.fillStyle = 'rgba(255, 255, 255, 0.16)';
      for (let i = 0; i < 90; i += 1) {
        const x = (i / 90) * width + Math.sin(phase * 0.7 + i * 1.7) * 8;
        const y =
          height * 0.16 +
          Math.sin(x * 0.02 + phase * 1.15 + i) * 10 +
          ((i % 5) - 2) * 6;
        const w = 1.5 + (i % 3) * 0.6;
        const h = 0.8 + (i % 2) * 0.5;
        ctx.fillRect(x, y, w, h);
      }

      const sunX = width * 0.84;
      const sunY = height * 0.12;
      const sunGrad = ctx.createRadialGradient(sunX, sunY, 8, sunX, sunY, 90);
      sunGrad.addColorStop(0, 'rgba(255, 248, 196, 0.65)');
      sunGrad.addColorStop(1, 'rgba(255, 248, 196, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 90, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(226, 232, 240, 0.72)';
      ctx.lineWidth = 1.4;
      for (let i = 0; i < 3; i += 1) {
        const bx = width * (0.12 + i * 0.06);
        const by = height * (0.11 + (i % 2) * 0.02);
        ctx.beginPath();
        ctx.moveTo(bx - 8, by);
        ctx.quadraticCurveTo(bx, by - 4, bx + 8, by);
        ctx.stroke();
      }
    };

    const resizeCanvas = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      populateEntities(activeProfileKey);
    };

    const onPointerDown = (event) => {
      pulses.push({
        x: event.clientX,
        y: event.clientY,
        strength: 1.45,
        radius: 125,
      });

      if (pulses.length > 20) {
        pulses.shift();
      }
    };

    const draw = (now) => {
      const delta = Math.min(2, (now - lastTime) / 16.67);
      lastTime = now;
      phase += 0.017 * delta;

      const profileKey =
        getProfileKeyBySection(activeTabRef.current) || getProfileKeyByDepth(depthRef.current);
      if (profileKey !== activeProfileKey) {
        activeProfileKey = profileKey;
        populateEntities(activeProfileKey);
      }

      const profile = zoneProfiles[activeProfileKey] || zoneProfiles.surface;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = profile.tint;
      ctx.fillRect(0, 0, width, height);

      if (activeProfileKey === 'surface') {
        drawBeachWaveBands(profile);
      }

      const waveIntensity = profile.waveIntensity ?? 1;
      const waveCenter = getWaveCenter(profile, depthRef.current, phase);

      if (waveIntensity > 0.08 && activeProfileKey !== 'surface') {
        for (const layer of waveLayers) {
          const dynamicBaseY = clamp(
            waveCenter +
              layer.offset * (0.7 + waveIntensity * 0.3) +
              Math.sin(phase * layer.driftSpeed + layer.offset * 9) * 0.01,
            0.08,
            0.97,
          );

          ctx.beginPath();

          for (let x = 0; x <= width; x += 10) {
            const localBoost = getPulseBoostAt(x, height * dynamicBaseY, 1.25);

            const localSpeed = phase * layer.speed * profile.waveSpeed * (1 + localBoost * 2.8);
            const y =
              height * dynamicBaseY +
              Math.sin(x * layer.freq + localSpeed) * layer.amp * profile.waveAmp * waveIntensity * (1 + localBoost * 0.42) +
              Math.sin(x * layer.freq * 0.52 + localSpeed * 0.7) *
                (layer.amp * 0.38) *
                profile.waveAmp *
                waveIntensity;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          ctx.globalAlpha = profile.waveAlpha * waveIntensity;
          ctx.strokeStyle = layer.color;
          ctx.lineWidth = layer.lineWidth;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }

      for (const entity of entities) {
        const localBoost = getPulseBoostAt(entity.x, entity.y, 1.25);
        const speedBoost = 1 + localBoost * 3.2;

        if (!entity.anchored) {
          entity.x += entity.vx * delta * speedBoost;
            entity.turnTimer -= delta;
            if (entity.turnTimer <= 0) {
              entity.vx += rand(-0.12, 0.12);
              entity.vy += rand(-0.05, 0.05);
              const speedCap = Math.max(0.2, Math.abs(entity.vx) + Math.abs(entity.vy));
              if (speedCap > 1.05) {
                entity.vx *= 0.86;
                entity.vy *= 0.86;
              }
              entity.turnTimer = rand(90, 260);
            }

            entity.baseY += entity.vy * delta * speedBoost;
            entity.baseY += Math.sin(phase * 0.25 + entity.seed) * 0.02 * delta;
        }

        if (entity.baseY < entity.minY) {
          entity.baseY = entity.minY;
          entity.vy = Math.abs(entity.vy) * 0.82;
        }
        if (entity.baseY > entity.maxY) {
          entity.baseY = entity.maxY;
          entity.vy = -Math.abs(entity.vy) * 0.82;
        }

        entity.y = entity.baseY + Math.sin(phase * entity.wobbleSpeed + entity.seed) * entity.wobbleAmp;

        if (!entity.anchored && entity.x < -90) {
          entity.x = width + 90;
          entity.baseY = rand(entity.minY, entity.maxY);
          entity.vx = Math.abs(entity.vx);
        }
        if (!entity.anchored && entity.x > width + 90) {
          entity.x = -90;
          entity.baseY = rand(entity.minY, entity.maxY);
          entity.vx = -Math.abs(entity.vx);
        }

        drawEntity(entity);
      }

      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        pulses[i].strength *= 0.972;
        pulses[i].radius += 4.2;

        if (pulses[i].strength < 0.045) {
          pulses.splice(i, 1);
        }
      }

      rafId = requestAnimationFrame(draw);
    };

    activeProfileKey = getProfileKeyBySection(activeTabRef.current) || getProfileKeyByDepth(depthRef.current);
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointerdown', onPointerDown);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useGSAP(() => {
    // 1. DEPTH COUNTER LOGIC
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setDepth(Math.floor(self.progress * 11000)); // Simulates 11,000m depth
      }
    });

    // 2. PARALLAX HERO ANIMATION
    gsap.to(".hero-text", {
      scrollTrigger: {
        trigger: ".section-1",
        start: "top top",
        scrub: true
      },
      y: 300,
      opacity: 0
    });

    // 3. BACKGROUND COLOR MORPH (Surface -> Abyss)
    const sections = gsap.utils.toArray('section');
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        onEnter: () => gsap.to("body", { backgroundColor: section.dataset.bg, duration: 1.2 }),
        onEnterBack: () => gsap.to("body", { backgroundColor: section.dataset.bg, duration: 1.2 }),
      });
    });

    // 4. UPDATE ACTIVE TAB AS USER SCROLLS
    tabItems.forEach((tab) => {
      ScrollTrigger.create({
        trigger: `#${tab.id}`,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveTab(tab.id);
          }
        },
      });
    });
  }, { scope: mainContainer });

  const handleTabClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveTab(id);
    }
  };

  return (
    <main ref={mainContainer} className="relative transition-colors duration-700 ocean-shell">
      {/* FIXED HUD (Heads-Up Display) */}
      <div className="fixed top-8 left-8 z-50 mix-blend-difference text-white font-mono">
        <p className="text-sm tracking-widest opacity-70">EXPEDITION: ODYSSEY</p>
        <h2 className="text-4xl font-bold">{depth.toLocaleString()}m</h2>
        <div className="w-36 h-1 rounded-full bg-white/25 mt-3 overflow-hidden">
          <div className="h-full bg-cyan-200" style={{ width: `${Math.min((depth / 11000) * 100, 100)}%` }} />
        </div>
      </div>

      <nav className="fixed top-8 right-6 md:right-8 z-50 tab-nav">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'tab-button-active' : ''}`}
            aria-pressed={activeTab === tab.id}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <canvas ref={waveCanvasRef} className="wave-canvas" aria-hidden="true" />

      <div className="ocean-glow ocean-glow-top" />
      <div className="ocean-glow ocean-glow-bottom" />

      {activeDetail && (
        <div
          className="detail-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveDetail(null)}
        >
          <div className="detail-panel" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="detail-close"
              onClick={() => setActiveDetail(null)}
              aria-label="Close detail panel"
            >
              <X size={20} />
            </button>

            {activeDetail.kind !== 'system' && (
              <img
                src={activeDetail.item.image}
                alt={activeDetail.item.title}
                className="detail-image"
              />
            )}

            <div className="detail-content">
              <p className="detail-kicker">
                {activeDetail.kind === 'zone' && 'Depth Zone Briefing'}
                {activeDetail.kind === 'system' && 'Mission System Briefing'}
                {activeDetail.kind === 'record' && 'Mission Record'}
              </p>
              <h3 className="detail-title">{activeDetail.item.title}</h3>

              {activeDetail.item.facts && (
                <div className="detail-metric-grid">
                  {activeDetail.item.facts.map((fact) => (
                    <div key={fact} className="detail-metric-card">{fact}</div>
                  ))}
                </div>
              )}

              {activeDetail.kind === 'zone' && (
                <>
                  <p className="detail-copy">{activeDetail.item.details}</p>
                </>
              )}

              {activeDetail.kind === 'system' && (
                <>
                  <p className="detail-copy">{activeDetail.item.detail}</p>
                  <div className="detail-facts">
                    <span className="fact-pill">{activeDetail.item.metric}</span>
                  </div>
                </>
              )}

              {activeDetail.kind === 'record' && (
                <>
                  <p className="detail-copy">{activeDetail.item.copy}</p>
                  <p className="detail-section-title">Key Findings</p>
                  <ul className="detail-list">
                    {activeDetail.item.findings.map((finding) => (
                      <li key={finding}>{finding}</li>
                    ))}
                  </ul>
                </>
              )}

              {activeDetail.item.highlights && (
                <>
                  <p className="detail-section-title">Highlights</p>
                  <ul className="detail-list">
                    {activeDetail.item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </>
              )}

              {activeDetail.item.insights && (
                <div className="detail-insight-grid">
                  {activeDetail.item.insights.map((insight) => (
                    <article key={insight.title} className="detail-insight-card">
                      <h4>{insight.title}</h4>
                      <p>{insight.text}</p>
                    </article>
                  ))}
                </div>
              )}

              {activeDetail.item.checklist && (
                <>
                  <p className="detail-section-title">Operation Checklist</p>
                  <div className="detail-facts">
                    {activeDetail.item.checklist.map((step) => (
                      <span key={step} className="fact-pill">{step}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 1: THE SURFACE */}
      <section 
        id="overview"
        className="section-1 min-h-screen flex flex-col items-center justify-center text-white p-10"
        data-bg="#0ea5e9"
      >
        <div className="hero-text text-center max-w-5xl">
          <div className="hero-image-frame mx-auto mb-8">
            <img
              src="/ocean/odyssey-mark.svg"
              alt="Ocean Odyssey emblem"
              className="hero-image mx-auto"
            />
          </div>
          <p className="tracking-[0.4em] uppercase text-xs md:text-sm opacity-70">Ocean Odyssey Archive</p>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight italic text-white mt-4">Abyssos</h1>
          <p className="text-lg md:text-2xl mt-6 opacity-90 text-slate-100">
            Descend from bright surface currents to the deepest trench in a cinematic, science-led journey.
          </p>
          <ArrowDown className="mx-auto mt-10 animate-bounce" size={48} />
        </div>
      </section>

      {/* SECTION 2: ZONE OVERVIEW */}
      <section 
        id="zones"
        className="min-h-screen text-white p-8 md:p-12"
        data-bg="#1e3a8a"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-white">Depth Zones</h2>
          <p className="text-slate-200 max-w-2xl mb-10">Explore each ocean band through illustrated snapshots of light, pressure, and marine life.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {zones.map((zone) => (
              <button
                key={zone.title}
                type="button"
                className="glass-card overflow-hidden card-lift detail-card text-left"
                onClick={() => openDetail('zone', zone)}
              >
                <img src={zone.image} alt={zone.title} className="w-full h-52 object-cover" />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-200">{zone.depth}</p>
                  <h3 className="text-2xl font-bold text-white mt-2">{zone.title}</h3>
                  <p className="text-slate-300 mt-3">{zone.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: INSTRUMENTS */}
      <section id="systems" className="min-h-screen p-8 md:p-14" data-bg="#0f172a">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-3">Mission Systems</h2>
          <p className="text-slate-300 max-w-3xl mb-10">Core instruments used by the crew to navigate safely, detect species activity, and protect the hull.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {missionSystems.map((system) => {
              const Icon = system.icon;
              return (
                <button
                  key={system.title}
                  type="button"
                  className="glass-card p-7 card-lift detail-card text-left"
                  onClick={() => openDetail('system', system)}
                >
                  <Icon className="text-cyan-200" size={34} />
                  <h3 className="text-2xl font-bold text-white mt-4">{system.title}</h3>
                  <p className="text-slate-300 mt-2">{system.summary}</p>
                  <span className="fact-pill inline-block mt-4">{system.metric}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: MISSION PANELS */}
      <section id="records" className="min-h-screen p-8 md:p-14" data-bg="#020617">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10">Mission Records</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {missionPanels.map((item) => (
              <button
                key={item.title}
                type="button"
                className="glass-card overflow-hidden card-lift detail-card text-left"
                onClick={() => openDetail('record', item)}
              >
                <img src={item.image} alt={item.title} className="w-full h-64 md:h-80 object-cover" />
                <div className="p-5">
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                  <p className="text-slate-300 mt-3">{item.copy}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: ABYSS */}
      <section id="abyss" className="h-[140vh]" data-bg="#01040f">
        <div className="sticky top-0 h-screen flex items-center justify-center text-white px-8">
          <div className="text-center max-w-3xl">
            <p className="tracking-[0.35em] uppercase text-xs opacity-60">10,500m</p>
            <h2 className="text-5xl md:text-8xl font-black mt-4 text-white">TOTAL DARKNESS</h2>
            <p className="mt-6 text-slate-300 text-lg">No sunlight. No horizon. Only pressure, silence, and a faint electric blue pulse.</p>
            <div className="mt-10 flex items-center justify-center gap-3 text-cyan-200">
              <Anchor size={18} />
              <span className="text-sm tracking-[0.22em] uppercase">Mission Complete</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}