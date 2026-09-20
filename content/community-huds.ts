export type CommunityHud = {
  id: string;
  creator: string;
  time: string;
  title: string;
  code: string;
  tag: string;
  fingers: string;
  server: string;
  image: string;
  url?: string;
};

export const COMMUNITY_HUDS: CommunityHud[] = [
  {
    id: "hud-1",
    creator: "@Amonimo",
    time: "1 month ago",
    title: "El Mejor para Br",
    code: "#FFHUDT6O3jqZR1R5Po7eM",
    tag: "3 DEDOS + INCLUDES SENSI",
    fingers: "3 dedos",
    server: "Americas",
    image: "/huds/hud-1.avif",
    url: "https://ffshare.garena.com/?region=BR&action=hud_share&share_code=28E882E6D303F2E42F07DEF62D2A9B353FD8FD94A92997BEFB2D068D18042F4D&generation_channel=1&version=OB54",
  },
  {
    id: "hud-2",
    creator: "@Amonimo",
    time: "7 days ago",
    title: "El Mejor Para M1014",
    code: "#FFHUDT6O3jkelhpRPo7eO",
    tag: "4 DEDOS + INCLUDES SENSI",
    fingers: "4 dedos",
    server: "Americas",
    image: "/huds/hud-2.avif",
    url: "https://ffshare.garena.com/?region=BR&action=hud_share&share_code=28E882E6D303F2E42F07DEF62D2A9B353FD8FD94A92997BEFB2D068D18042F4D&generation_channel=1&version=OB54",
  },
  {
    id: "hud-3",
    creator: "@Amonimo",
    time: "Today",
    title: "El Mejor para PvP",
    code: "#FFHUDT6O3j7r9ZU5Po7eO",
    tag: "2 DEDOS + INCLUDES SENSI",
    fingers: "2 dedos",
    server: "Americas",
    image: "/huds/hud-3.avif",
    url: "https://ffshare.garena.com/?region=BR&action=hud_share&share_code=28E882E6D303F2E42F07DEF62D2A9B353FD8FD94A92997BEFB2D068D18042F4D&generation_channel=1&version=OB54",
  },
];