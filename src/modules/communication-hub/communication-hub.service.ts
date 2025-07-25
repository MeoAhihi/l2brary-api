import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendEmailDto } from './dto/send-email.dto';
import { GroupRoleManagementService } from '../group-role-management/group-role-management.service'; // Assuming this is available
import { Member } from 'src/entities/member.entity';
import { Group } from 'src/entities/group.entity';

@Injectable()
export class CommunicationHubService {
  private readonly logger = new Logger(CommunicationHubService.name);

  constructor(
    private readonly mailerService: MailerService,
    // Inject other services to get data, e.g., GroupRoleManagementService
    private readonly groupRoleService: GroupRoleManagementService,
  ) {}

  /**
   * A generic method to send an email using a template.
   * @param sendEmailDto The email details.
   */
  async sendEmail(sendEmailDto: SendEmailDto): Promise<void> {
    const { to, subject, template, context } = sendEmailDto;

    try {
      await this.mailerService.sendMail({
        to,
        subject,
        template: `./${template}`, // Path relative to the templates dir
        context,
      });
      this.logger.log(`Email sent to ${to} with subject "${subject}"`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error.stack);
      throw new InternalServerErrorException('Failed to send email.');
    }
  }

  // --- High-Level Notification Methods ---

  /**
   * Sends a welcome email to a new member.
   * @param member The newly registered member.
   */
  async sendWelcomeEmail(member: Member): Promise<void> {
    const url = 'http://localhost:3000/dashboard'; // Your frontend URL
    await this.sendEmail({
      to: member.email,
      subject: 'Welcome to the L2brary Club!',
      template: 'welcome',
      context: {
        name: member.fullName,
        url,
      },
    });
  }

  /**
   * Sends a reminder for an upcoming class.
   * @param member The member to notify.
   * @param classDetails An object with class information.
   */
  async sendClassReminder(
    member: Member,
    classDetails: { className: string; classTime: string; zaloLink: string },
  ): Promise<void> {
    await this.sendEmail({
      to: member.email,
      subject: `Reminder: Your class "${classDetails.className}" is tomorrow`,
      template: 'class-reminder',
      context: {
        name: member.fullName,
        ...classDetails,
      },
    });
  }

  /**
   * Sends a notification to all members of a specific group.
   * (This is an example of a more complex notification)
   * @param group The group to notify.
   * @param subject The email subject.
   * @param message The main message content for a generic template.
   */
  async sendNotificationToGroup(
    group: Group,
    subject: string,
    message: string,
  ): Promise<void> {
    const members = await this.groupRoleService.findMembersInGroup(
      group._id.toHexString(),
    );
    this.logger.log(
      `Sending notification to ${members.length} members of group "${group.name}"`,
    );

    for (const member of members) {
      if (member.notificationPreferences.email.instantAlerts) {
        await this.sendEmail({
          to: member.email,
          subject,
          template: 'generic-notification', // You would create this template
          context: {
            name: member.fullName,
            message,
            groupName: group.name,
          },
        });
      }
    }
  }
}
