import { NextResponse } from "next/server";
import { transporter, MAIL_FROM, MAIL_TO } from "@/lib/mailer";

const INTEREST_LABELS: Record<string, string> = {
  customer: "عميل يبحث عن منتجات",
  provider: "أسرة منتجة تريد البيع",
  enterprise: "شريك أو مستثمر",
};

export async function POST(request: Request) {
  try {
    const { name, email, company, interest, message } = await request.json() as {
      name: string;
      email: string;
      company?: string;
      interest: string;
      message: string;
    };

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const interestLabel = INTEREST_LABELS[interest] ?? interest;

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject: `[OSR] استفسار جديد — ${interestLabel}`,
      html: `
        <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#FFFBF3;border-radius:12px;overflow:hidden;border:1px solid #eee;">
          <div style="background:#F9B233;padding:20px 28px;">
            <h1 style="color:#1A1410;margin:0;font-size:20px;font-weight:700;">رسالة جديدة من موقع OSR</h1>
          </div>
          <div style="padding:28px;background:#fff;">
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#1A1410;width:150px;">الاسم الكامل</td>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#333;">${name}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#1A1410;">البريد الإلكتروني</td>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#333;">
                  <a href="mailto:${email}" style="color:#C8102E;text-decoration:none;">${email}</a>
                </td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#1A1410;">المتجر / المشروع</td>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;color:#333;">${company}</td>
              </tr>` : ""}
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;font-weight:700;color:#1A1410;">نوع الاستفسار</td>
                <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                  <span style="background:#F9B233;color:#1A1410;padding:3px 12px;border-radius:20px;font-size:13px;font-weight:600;">${interestLabel}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;font-weight:700;color:#1A1410;vertical-align:top;">الرسالة</td>
                <td style="padding:12px 0;color:#333;white-space:pre-wrap;line-height:1.7;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="padding:16px 28px;background:#faf7f2;border-top:1px solid #eee;text-align:center;">
            <p style="margin:0;color:#999;font-size:12px;">تم الإرسال عبر موقع OSR &mdash; osr.sa</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
