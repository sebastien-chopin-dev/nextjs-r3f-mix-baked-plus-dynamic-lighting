import tunnel from "tunnel-rat";

// Views render their 3D children into r3f.In; the shared Canvas renders r3f.Out.
export const r3f = tunnel();
