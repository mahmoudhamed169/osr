import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const ACTIVITY_LABELS: Record<string, string> = {
  food:     "ماكولات وحلويات",
  crafts:   "أشغال وحرف يدوية",
  products: "منتجات",
  other:    "أخرى",
};

const TIME_LABELS: Record<string, string> = {
  morning:   "الصباح  (9 ص – 12 م)",
  afternoon: "الظهيرة (12 م – 5 م)",
  evening:   "المساء  (5 م – 9 م)",
};

export async function POST(request: Request) {
  try {
    const { name, phone, activityTypes, preferredTime, notes } =
      await request.json() as {
        name: string;
        phone: string;
        activityTypes?: string[];
        preferredTime?: string;
        notes?: string;
      };

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const activity = activityTypes?.length
      ? activityTypes.map((a) => ACTIVITY_LABELS[a] ?? a).join(" ، ")
      : "—";
    const timing   = TIME_LABELS[preferredTime ?? ""] ?? preferredTime ?? "—";

    await resend.emails.send({
      from: "OSR Website <onboarding@resend.dev>",
      to:   "mahmoud.hamed.shenawy@gmail.com", // TODO: change to support@osr.sa after domain verification
      subject: `[OSR] طلب استشارة مجانية — ${name}`,
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#FFFBF3;border-radius:12px;overflow:hidden;border:1px solid #eee;">
          <div style="background:#F9B233;padding:20px 28px;">
            <h1 style="color:#1A1410;margin:0;font-size:20px;font-weight:700;">طلب استشارة مجانية 📞</h1>
            <p style="color:#1A1410;margin:6px 0 0;font-size:14px;opacity:.75;">وصل طلب جديد من موقع OSR</p>
          </div>
          <div style="padding:28px;background:#fff;">
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#1A1410;width:170px;">الاسم الكامل</td>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#333;">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#1A1410;">رقم الجوال</td>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#333;direction:ltr;text-align:right;">
                  <a href="tel:${phone}" style="color:#C8102E;text-decoration:none;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#1A1410;">نوع النشاط</td>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="background:#F9B233;color:#1A1410;padding:3px 12px;border-radius:20px;font-size:13px;font-weight:600;">${activity}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:${notes ? "1px solid #f0f0f0" : "none"};font-weight:700;color:#1A1410;">أفضل وقت للتواصل</td>
                <td style="padding:12px 0;border-bottom:${notes ? "1px solid #f0f0f0" : "none"};color:#333;">${timing}</td>
              </tr>
              ${notes ? `
              <tr>
                <td style="padding:12px 0;font-weight:700;color:#1A1410;vertical-align:top;">ملاحظات</td>
                <td style="padding:12px 0;color:#333;white-space:pre-wrap;line-height:1.7;">${notes}</td>
              </tr>` : ""}
            </table>
          </div>
          <div style="padding:16px 28px;background:#faf7f2;border-top:1px solid #eee;text-align:center;">
            <p style="margin:0;color:#999;font-size:12px;">تم الإرسال عبر موقع OSR — osr.sa</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[consultation] email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
